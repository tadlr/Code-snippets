<?php
	// Basado en https://github.com/WordPress/twentyseventeen/blob/master/header.php
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet"/>
<script src="/wp-content/themes/genesis-sample/assets/js/autocomplete.js"></script> 
<!--<link rel="stylesheet" href="/wp-content/themes/genesis-sample/assets/awesomplete/awesomplete.css" />
<script src="/wp-content/themes/genesis-sample/assets/awesomplete/awesomplete.js" async></script> -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDU5Tx8HvuFFfiReY3609UUT4QMmuBRGeM&libraries=places&callback=initAutocomplete" async defer></script>

<?php wp_head(); ?>
</head>

<body onunload="" id="page-top" <?php body_class(); ?>>
<script>
var urlCompleta = '<?php echo get_stylesheet_directory_uri();?>/';
</script>
    
<script language="JavaScript">
<!--
function urlCheck() {
if(
    window.location.href=="/user/"
)
    {
    window.location.href = "/profile/#?edit=false";
    } 
    if(
    window.location.href=="/n-user"
    )
    {
    window.location.href = "/profile/#?newuser=false";
    } 
    if(
    window.location.href=="/signup/welcome/"
    )
    {
    window.location.href = "/login";
    }
    else{

    } 
}
urlCheck() /* autoLoadFunction */
//-->
</script>

<script async src=“https://www.googletagmanager.com/gtag/js?id=UA-115018350-1“></script>
<script>
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag(‘js’, new Date());

 gtag(‘config’, ‘UA-115018350-1’);
</script>