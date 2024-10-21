<?php

function t($default = '') {
    $Language = getLanguage(); // Fetch current language setting
    $getStrings = get_field('string', 'strings'); // Get all translations
    $addTranslation = true; // Flag to determine if new translation needs to be added
    $translation = $default; // Default translation

    if ($Language === 'en') {
        return $default;
    }

    foreach ($getStrings as $translations) {
        if (isset($translations['en']) && $translations['en'] === $default) {
            if (isset($translations[$Language])) {
                $translation = $translations[$Language];
                $addTranslation = false;
                break; // Found the translation, no need to continue
            }
            break; // Found the English version but no translation in the desired language
        }
    }

    // If translation is still default and needs adding, add it
    if ($translation === $default && $addTranslation) {
        add_translation($default);
    }

    return empty($translation) ? $default : $translation; // Return translation or default if empty
}

function add_translation($english) {
    // Check if the repeater field already contains the English translation
    $rows = get_field('string', 'strings'); // Retrieve all rows from the repeater field on the options page

    $row_key = false;

    // Search for the row with the same English translation
    if ($rows) {
        foreach ($rows as $index => $row) {
            if ($row['en'] === $english) {
                $row_key = $index;
                break;
            }
        }
    }

    // If the English translation is found, update that row
    if (false === is_numeric($row_key)) {
        // Add a new row to the repeater if the English translation isn't found
        $new_row = [
            'en' => $english,
        ];
        add_row('string', $new_row, 'strings');
    }
}
