<?php
    require('excepciones/general.php');
    require('manejador-ganchos.php');
    //require(dirname(dirname(__FILE__)).'/lib/hooks.php'); // Para algunos hooks; doble dirname() para obtener directorio padre (por alguna razón "../lib/hooks.php" no funciona)

    class Inicializador // Singleton basado en https://jamesdigioia.com/a-better-wordpress-singleton/
    {
        protected static $instancia = null; // Variable "estática" nunca pierde su valor durante la ejecución del programa

        public function __construct()
        {
            try
            {
                self::validarInstancia();
            }
            catch(ExcepcionGeneral $eg)
            {
                echo $eg->obtenerMensajeError();
            }
        }
        public function obtenerInstancia()
        {
            return static::$instancia;
        }
        private function validarInstancia()
        {
            if(static::$instancia === null)
            {
                static::$instancia = $this;
            }
            else
            {
                throw new ExcepcionGeneral('Solamente puede existir un objeto '.get_class($this).' a la vez.');
            }
        }

        // Métodos propios de la clase
        public function ejecutar()
        {
            $g = new ManejadorGanchos();

            self::habilitarCaracteristicasTema();

            $g->removerAccionGenesis('genesis_header', 'genesis_header_markup_open', 5);
            $g->removerAccionGenesis('genesis_header', 'genesis_do_header');
            $g->removerAccionGenesis('genesis_header', 'genesis_header_markup_close', 15);
            $g->removerAccionGenesis('genesis_footer', 'genesis_footer_markup_open', 5);
            $g->removerAccionGenesis('genesis_footer', 'genesis_do_header');
            $g->removerAccionGenesis('genesis_footer', 'genesis_footer_markup_close', 15);

            //register_nav_menu('sh-main-menu', 'Header menu of SyncHub');
        }
        public function registrarSeccionWidgets($nombre = '', $id = '', $clases = '')
        {
            register_sidebar(array(
                'name' => $nombre,
                'id' => $id,
                'before_widget' => '<div class="'.$clases.'">',
                'after_widget' => '</div>'
            ));
        }
        private function habilitarCaracteristicasTema()
        {
            // Específicas de Wordpress: https://codex.wordpress.org/Theme_Features
            add_theme_support('custom-header');
            add_theme_support('title-tag');
            add_theme_support('html5', array('search-form', 'comment-form', 'comment-list'));
            add_theme_support('genesis-responsive-viewport');
            // Específicas de Genesis
            /*add_theme_support('genesis-accessibility', array( 'headings', 'drop-down-menu',  'search-form', 'skip-links', 'rems' ) );
            add_theme_support('genesis-footer-widgets', 8);*/
        }
    }
?>