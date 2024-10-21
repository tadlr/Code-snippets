//
//  DataModel.swift
//  DoorsOpenOttawa
//
//  Created by Tay on 2023-11-27.
//

import Combine
import FirebaseStorage
import Foundation
import MapKit
import SwiftUI

class BuildingsDataStore: NSObject, ObservableObject, CLLocationManagerDelegate {
	@Published var buildings: [Building] = []
	@Published var categories: Set<String> = []
	@Published var userLocation: CLLocation?
	@Published var isFilteringForNewBuildings = false
	@Published var searchText = ""
	@Published var selectedCategory: String = ""
	@Published var isAccessibleFilter: Bool = false
	@Published var isFamilyFriendlyFilter: Bool = false
	@Published var isShuttleFilter: Bool = false
	@Published var isPublicWashroomsFilter: Bool = false
	@Published var isFreeParkingFilter: Bool = false
	@Published var isBikeParkingFilter: Bool = false
	@Published var isPaidParkingFilter: Bool = false
	@Published var isGuidedTourFilter: Bool = false
	@Published var isOCTranspoNearbyFilter: Bool = false
	@Published var isOpenSaturdayFilter: Bool = false
	@Published var isOpenSundayFilter: Bool = false
	@Published var ready: Bool = false

	@Published var filteredBuildings: [Building] = []

	@Published var mapRegion: MKCoordinateRegion = .init(
		center: CLLocationCoordinate2D(latitude: 45.4215, longitude: -75.6919),
		span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
	)

	private var locationManager: CLLocationManager?

	override init() {
		super.init()
		NetworkManager.shared.startMonitoring()
		setupLanguageChangeListener()
		setupLocationManager()
		loadBuildingsData()
	}

	deinit {
		NetworkManager.shared.stopMonitoring()
	}

	private func setupLanguageChangeListener() {
		NotificationCenter.default.addObserver(forName: .languageChanged, object: nil, queue: .main) { [weak self] _ in
			self?.loadBuildingsData()
		}
	}

	private func setupLocationManager() {
		locationManager = CLLocationManager()
		locationManager?.delegate = self
		locationManager?.desiredAccuracy = kCLLocationAccuracyBest
		locationManager?.requestWhenInUseAuthorization()
		locationManager?.startUpdatingLocation()
	}

	func distanceFromUser(to building: Building) -> CLLocationDistance? {
		guard let userLocation = userLocation else { return nil }
		let buildingLocation = CLLocation(latitude: building.latitude, longitude: building.longitude)
		return userLocation.distance(from: buildingLocation) / 1000 // Distance in kilometers
	}

	func locationManager(_: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
		if let location = locations.last {
			userLocation = location
			updateMapRegion(with: location.coordinate)
		}
	}

	func updateMapRegion(with coordinate: CLLocationCoordinate2D) {
		let span = MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
		mapRegion = MKCoordinateRegion(center: coordinate, span: span)
	}

	func applyFilters() -> [Building] {
		let filtered = buildings.filter { building in
			(!isFilteringForNewBuildings || building.isNew) &&
				(selectedCategory.isEmpty || building.category == selectedCategory) &&
				(!isShuttleFilter || building.isShuttle) &&
				(!isPublicWashroomsFilter || building.isPublicWashrooms) &&
				(!isAccessibleFilter || building.isAccessible) &&
				(!isFreeParkingFilter || building.isFreeParking) &&
				(!isBikeParkingFilter || building.isBikeParking) &&
				(!isPaidParkingFilter || building.isPaidParking) &&
				(!isGuidedTourFilter || building.isGuidedTour) &&
				(!isFamilyFriendlyFilter || building.isFamilyFriendly) &&
				(!isOCTranspoNearbyFilter || building.isOCTranspoNearby) &&
				(!isOpenSaturdayFilter || building.isOpenSaturday) &&
				(!isOpenSundayFilter || building.isOpenSunday) &&
				(searchText.isEmpty || building.name.localizedCaseInsensitiveContains(searchText))
		}
		return filtered
	}

	func loadBuildingsData() {
		ready = false
		if NetworkManager.shared.isConnected {
			loadJsonFromFirebase { success in
				if !success {
					self.loadFromLocalStorageOrShowError()
				}
				self.ready = true
			}
		} else {
			loadFromLocalStorageOrShowError()
			ready = true
		}
	}

	private func loadFromLocalStorageOrShowError() {
		if loadJsonFromLocalStorage() {
			print("Loaded data from local storage")
		} else {
			print("Error: Data could not be loaded from local storage or Firebase")
		}
	}

	func loadJsonFromFirebase(completion: @escaping (Bool) -> Void) {
		let storage = Storage.storage()
		let jsonRef = storage.reference().child("buildings.json")

		jsonRef.getData(maxSize: 1 * 1024 * 1024) { [weak self] data, error in
			if let error = error {
				print("Error fetching data from Firebase: \(error)")
				completion(false)
			} else if let data = data {
				self?.saveToLocalStorage(jsonData: data)
				self?.parseAndSave(jsonData: data)
				completion(true)
			}
		}
	}

	func filterBuildings() {
		filteredBuildings = applyFilters()
		print("Filtered buildings: \(filteredBuildings.count)")
	}

	func resetFilters() {
		isFilteringForNewBuildings = false
		searchText = ""
		selectedCategory = ""
		isAccessibleFilter = false
		isFamilyFriendlyFilter = false
		isShuttleFilter = false
		isPublicWashroomsFilter = false
		isFreeParkingFilter = false
		isBikeParkingFilter = false
		isPaidParkingFilter = false
		isGuidedTourFilter = false
		isOCTranspoNearbyFilter = false
		isOpenSaturdayFilter = false
		isOpenSundayFilter = false

		filteredBuildings = applyFilters()
	}

	private func updateCategories() {
		let allCategories = buildings.map { $0.category }
		categories = Set(allCategories)
	}

	private func isFirstLaunch() -> Bool {
		let launchedBefore = UserDefaults.standard.bool(forKey: "launchedBefore")
		if !launchedBefore {
			UserDefaults.standard.set(true, forKey: "launchedBefore")
			return true
		}
		return false
	}

	private func loadJsonFromAssets() {
		var language = UserDefaults.standard.string(forKey: "SelectedLanguage") ?? "en"

		language = language == "fr-CA" ? "fr" : language

		guard let url = Bundle.main.url(forResource: "buildings", withExtension: "json"),
		      let data = try? Data(contentsOf: url)
		else {
			print("Error: Couldn't load data from assets")
			return
		}
		parseAndSave(jsonData: data)
	}

	private func parseAndSave(jsonData: Data) {
		var language = UserDefaults.standard.string(forKey: "SelectedLanguage") ?? "en"

		language = language == "fr-CA" ? "fr" : language

		let favoriteBuildingIDs = UserDefaults.standard.array(forKey: "favoriteBuildingIds") as? [Int] ?? []

		do {
			let buildingList = try JSONDecoder().decode([BuildingList].self, from: jsonData)
			buildings = buildingList.first { $0.language == language }?.buildings.map { building in
				var modifiedBuilding = building
				modifiedBuilding.isFavorite = favoriteBuildingIDs.contains(building.id)

				return modifiedBuilding
			} ?? []
			saveToLocalStorage(jsonData: jsonData)
			print("Success: Loaded data for language \(language) from assets")
			updateCategories()
		} catch {
			print("Error: Couldn't parse JSON data - \(error)")
		}
	}

	private func saveToLocalStorage(jsonData: Data) {
		UserDefaults.standard.set(jsonData, forKey: "buildingsData")
	}

	func saveFavorites(favoriteBuildingIDs: [Int]) {
		UserDefaults.standard.set(favoriteBuildingIDs, forKey: "favoriteBuildingIds")
	}

	private func updateFavorites() {
		guard let favoriteBuildingIDs = UserDefaults.standard.array(forKey: "favoriteBuildingIds") as? [Int] else { return }
		buildings = buildings.map { building in
			var modifiedBuilding = building
			modifiedBuilding.isFavorite = favoriteBuildingIDs.contains(building.id)
			return modifiedBuilding
		}
	}

	func building(by id: Int) -> Building? {
		buildings.first { $0.id == id }
	}

	func toggleFavorite(for buildingId: Int) {
		if let index = buildings.firstIndex(where: { $0.id == buildingId }) {
			buildings[index].isFavorite?.toggle()

			var favoriteIDs = UserDefaults.standard.array(forKey: "favoriteBuildingIds") as? [Int] ?? []
			if buildings[index].isFavorite ?? false {
				favoriteIDs.append(buildings[index].id)
			} else {
				favoriteIDs.removeAll { $0 == buildings[index].id }
			}

			UserDefaults.standard.set(favoriteIDs, forKey: "favoriteBuildingIds")
		}
	}

	private func loadJsonFromLocalStorage() -> Bool {
		var language = UserDefaults.standard.string(forKey: "SelectedLanguage") ?? "en"

		language = language == "fr-CA" ? "fr" : language
		guard let jsonData = UserDefaults.standard.data(forKey: "buildingsData") else {
			return false
		}
		do {
			let buildingList = try JSONDecoder().decode([BuildingList].self, from: jsonData)
			if let index = buildingList.firstIndex(where: { $0.language == language }) {
				updateFavorites()
				buildings = buildingList[index].buildings
				ready = true
				return true
			}
		} catch {
			print("Error: Couldn't load data from local storage")
			ready = true
		}
		return false
	}

	func updateMapRegion() {
		if !filteredBuildings.isEmpty {
			let coordinates = filteredBuildings.map {
				CLLocationCoordinate2D(latitude: $0.latitude, longitude: $0.longitude)
			}

			let maxLat = coordinates.map { $0.latitude }.max()!
			let minLat = coordinates.map { $0.latitude }.min()!
			let maxLon = coordinates.map { $0.longitude }.max()!
			let minLon = coordinates.map { $0.longitude }.min()!

			let center = CLLocationCoordinate2D(latitude: (maxLat + minLat) / 2, longitude: (maxLon + minLon) / 2)
			let span = MKCoordinateSpan(latitudeDelta: (maxLat - minLat) * 1.2, longitudeDelta: (maxLon - minLon) * 1.2)

			mapRegion = MKCoordinateRegion(center: center, span: span)
		}
	}
}

class BuildingContainer: ObservableObject {
	@Published var building: Building

	init(building: Building) {
		self.building = building
	}
}
