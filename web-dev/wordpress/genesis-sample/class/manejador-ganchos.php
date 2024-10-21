<?php
	// Esta clase nos permite registrar los hooks de WP de una manera ordenada y asignando valores por defecto a algunos argumentos adicionales que de otra forma podrían causar problemas al no ejecutarse o respetar el número de argumentos.
    class ManejadorGanchos // Permite manejar los ganchos (acciones y filtros) de Wordpress y Genesis (los cuales son ligeramente diferentes entre sí)
    {
        protected static $instancia = null;

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
        public static function obtenerInstancia()
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
        public function agregarFiltro($ganchoWP = '', $retrollamada = '', $prioridad = 10, $cantidad_argumentos = 0)
        {
            add_filter($ganchoWP, $retrollamada, $prioridad, $cantidad_argumentos);
		}
		public function agregarAccion($ganchoWP = '', $retrollamada = '', $prioridad = 10, $cantidad_argumentos = 0)
		{
			add_action($ganchoWP, $retrollamada, $prioridad, $cantidad_argumentos);
		}
		public function agregarFiltroGenesis($ganchoGen = '', $retrollamada = '')
        {
            // TODO: investigar cómo se hacen las llamadas a filtros de Genesis (si existen)
		}
		public function agregarAccionGenesis($ganchoGen = '', $retrollamada = '')
		{
			$delimitadorGen = 'genesis_'; // Algunos hooks de Genesis comienzan con "genesis_<accion o filtro>"
			$hookDefaultGenesis = explode($delimitadorGen, $ganchoGen)[1];
			remove_action($ganchoGen, 'genesis_do_'.$hookDefaultGenesis); // Al parecer todas las acciones por defecto de Genesis comienzan con "genesis_do"
			self::agregarAccion($ganchoGen, $retrollamada);
        }
        public function removerAccionGenesis($uno = '', $dos = '', $prioridad = 10)
        {
            remove_action($uno, $dos, $prioridad);
        }
    }
?>