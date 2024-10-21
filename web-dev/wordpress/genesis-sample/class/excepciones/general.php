<?php
    class ExcepcionGeneral extends Exception
    {
        public function obtenerMensajeError()
        {
            return 'Excepción ocurrida en '.$this->getFile().' (línea '.$this->getLine().'): '.$this->getMessage();
        }
    }
?>