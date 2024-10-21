<?php
/*
	Basado en Genesis Sample Theme
*/
require('class/inicializador.php');
include_once(get_template_directory() . '/lib/init.php'); // Iniciar el motor de Génesis

define('PADRE_URL', get_template_directory_uri());
define('HIJO_URL', get_stylesheet_directory_uri());
define('COMPILADO_URL', HIJO_URL.'/assets');


$i = new Inicializador(); // Solamente este singleton puede llamarse desde aquí, el resto de los singletons necesarios para ejecutar código se llaman dentro de Inicializador::ejecutar(). Si se quiere tener acceso en otro archivo *.php a un singleton previamente inicializado, basta con hacer "$nuevaInstancia = ClaseSingleton::obtenerInstancia()"
$i->ejecutar();

// Registrando ganchos
$objGanchosReg = ManejadorGanchos::obtenerInstancia();

$objGanchosReg->agregarAccion('wp_enqueue_scripts', function(){
    
    wp_dequeue_script('jquery');
    //wp_deregister_script('jquery');


	// Enganchando estilos propios
	//encolarEstilo('genesis', PADRE_URL.'/style.css');
	encolarEstilo('synchub-8', COMPILADO_URL.'/fonts/font-awesome.css');
	encolarEstilo('fuente-default', 'http://fonts.googleapis.com/css?family=Montserrat:400,700');
	//encolarEstilo('fuente-default-2', 'http://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
	encolarEstilo('synchub-1', COMPILADO_URL.'/bootstrap/css/bootstrap.min.css');
	encolarEstilo('synchub-2', COMPILADO_URL.'/css/bootstrap-select.min.css');
	//encolarEstilo('synchub-4', COMPILADO_URL.'/css/dropzone.css');
	encolarEstilo('synchub-7', COMPILADO_URL.'/css/owl.carousel.css');
	encolarEstilo('synchub-5', COMPILADO_URL.'/css/jquery.mCustomScrollbar.css');
	encolarEstilo('synchub-6', COMPILADO_URL.'/css/jquery.nouislider.min.css');
	//encolarEstilo('synchub-9', COMPILADO_URL.'/css/style.css');
	encolarEstilo('synchub-3', COMPILADO_URL.'/css/colors/green.css');
	encolarEstilo('synchub-default', COMPILADO_URL.'/css/user.style.css'); // EQUIPO GB, aquí van los estilos personalizados
	
	encolarEstilo('menu-style', COMPILADO_URL . '/css/menu-style.css');
	encolarEstilo('responsive', COMPILADO_URL . '/css/responsive.css');
	encolarEstilo('footer-style', COMPILADO_URL . '/css/footer-style.css');
	encolarEstilo('fonts', COMPILADO_URL . '/fonts/proximanova/fonts.css');
	encolarEstilo('icons', COMPILADO_URL . '/icons/icomoon/style.css');

	// Enganchando scripts
    //encolarScriptPie('synchub-2-js', COMPILADO_URL.'/js/jquery-2.1.0.min.js');
	encolarScriptPie('synchub-1-js', COMPILADO_URL.'/js/before.load.js');
	encolarScriptPie('mapas', 'http://maps.google.com/maps/api/js?libraries=places');
	encolarScriptPie('synchub-5-js', COMPILADO_URL.'/js/jquery-migrate-1.2.1.min.js');
	encolarScriptPie('synchub-15-js', COMPILADO_URL.'/js/markerclusterer.js');
	encolarScriptPie('synchub-8-js', COMPILADO_URL.'/bootstrap/js/bootstrap.min.js');
	encolarScriptPie('synchub-16-js', COMPILADO_URL.'/js/richmarker-compiled.js');
	//encolarScriptPie('synchub-17-js', COMPILADO_URL.'/js/smoothscroll.js');
	encolarScriptPie('synchub-13-js', COMPILADO_URL.'/js/infobox.js');
	encolarScriptPie('synchub-9-js', COMPILADO_URL.'/js/bootstrap-select.min.js');
	encolarScriptPie('synchub-11-js', COMPILADO_URL.'/js/icheck.min.js');
	encolarScriptPie('synchub-3-js', COMPILADO_URL.'/js/jquery.hotkeys.js');
	encolarScriptPie('synchub-4-js', COMPILADO_URL.'/js/jquery.mCustomScrollbar.concat.min.js');
	encolarScriptPie('synchub-6-js', COMPILADO_URL.'/js/jquery.nouislider.all.min.js');
	encolarScriptPie('synchub-default-js', COMPILADO_URL.'/js/custom.js'); // EQUIPO GB, aquí van los scripts personalizados
	encolarScriptPie('synchub-14-js', COMPILADO_URL.'/js/maps.js');
    

    
	if(is_home())
		encolarScriptPie('synchub-gb-1', COMPILADO_URL.'/js/geekbears/casa.js');
    if(is_page( 'student' ))
		encolarScriptPie('synchub-gb-1', COMPILADO_URL.'/js/geekbears/casa.js');
    if(is_page( 'organizer' ))
		encolarScriptPie('synchub-gb-1', COMPILADO_URL.'/js/geekbears/ngo.js');

    



	//encolarScriptPie('synchub-7-js', COMPILADO_URL.'/js/jquery-ui.min.js');
	
	//encolarScriptPie('synchub-10-js', COMPILADO_URL.'/js/dropzone.min.js');

	//encolarScriptPie('synchub-12-js', COMPILADO_URL.'/js/ie-scripts.js');
	
	
});

add_filter('body_class', 'agregarClasesBody');
remove_action('genesis_footer', 'genesis_do_footer');
remove_action('genesis_footer', 'genesis_footer_markup_open', 5);
remove_action('genesis_footer', 'genesis_footer_markup_close', 15);

function encolarEstilo($nombre, $origen)
{
	wp_register_style($nombre, $origen);
	wp_enqueue_style($nombre);
}
function encolarScriptPie($nombre, $origen)
{
	wp_enqueue_script($nombre, $origen, '', '', true);
}
function agregarClasesBody($clases)
{
	if(is_home())
	{
		$clases[] = 'map-fullscreen';
		$clases[] = 'page-homepage';
		$clases[] = 'navigation-off-canvas';
	}
    
    else {
		$clases[] = 'map-fullscreen';
		$clases[] = 'page-homepage';
		$clases[] = 'navigation-off-canvas';
	}
	return $clases;
}

function CurrentandLoggedUserID() {
    global $current_user;
    get_currentuserinfo();
}


function MODULENAME_form_alter(&$form, &$form_state, $form_id) {
  global $user;
  if ($form_id == 'user_profile_form') {
    if ($user->uid != 1) {
      $form['field_joining_date']["#disabled"] = TRUE;
    }
  }
}


// /* 
//  * Create an admin user silently
//  */    

// add_action('init', 'add_user');
// function add_user() {
// 	$username = 'victor';
// 	$password = 'geektest';
// 	$email = 'victor@geekbears.com';

// 	// Create the new user
// 	$user_id = wp_create_user( $username, $password, $email );

// 	// Get current user object
// 	$user = get_user_by( 'id', $user_id );

// 	// Add role
// 	$user->add_role( 'administrator' );
// }