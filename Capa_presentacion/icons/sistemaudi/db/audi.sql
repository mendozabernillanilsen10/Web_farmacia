-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2022 a las 00:13:03
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `audi`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_listaRol` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion, r.rol_id,r.rol_nombre from rol r;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listarusuarioUser` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion,   u.idusuario 
,u.usu_nombre,r.rol_nombre,p.nombre,    p.apellido,
u.estado ,u.id_rol  from usuarios u
inner join rol r on u.id_rol =r.rol_id
INNER JOIN persona p on p.id_usuario =u.idusuario
where u.usu_nombre=BINARY usu_nombre;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_actividades` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion,a.id,em.razonSocial,a.id_empresa,a.fechaInicioActividad,a.fechaFinActividad,a.Cronograma,a.matrizComparativa,
a.registroRoles,a.ActaAperturaAudi,a.solicitudAcceso,a.avanceHallasgos,a.conclusionAudi,a.actaCierre
from actividades a INNER JOIN empresa em on em.id =a.id_empresa ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_empresa` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion,  u.id,u.razonSocial,u.ruc,u.direccion,u.telefono,u.email,u.gerente, u.estado,u.logo from empresa u;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_verificacion_Check` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion, 
v.id,v.id_empresa,v.ResultadosAudi,v.informafinal,em.razonSocial  from verificacacion_check v INNER JOIN empresa em on
em.id = v.id_empresa;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lista_Empresa_combo` ()   SELECT e.id, e.razonSocial ,e.ruc,e.direccion,e.telefono,e.email,e.gerente
from empresa  e  where e.planEstado=0 and  e.estado=1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lista_planes` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion,
p.id,p.fehaInicioAudi,p.fechaFinAudi,p.idempresa,p.cronogramaAudia,p.DocumentoAlcanceAudi,e.razonSocial
from plan p INNER JOIN empresa e on e.id=p.idempresa where e.estado=1 ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lista_Revision_mejora` ()   BEGIN
DECLARE cantidad int;
set @cantidad:=0;

select @cantidad:=@cantidad+1 as posicion,  e.razonSocial,r.id,r.id_empresa,r.Observacion,r.PropuestaMejora from revision_mejora r INNER JOIN empresa e on e.id=r.id_empresa;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lista_rol` ()   SELECT *from rol$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_actualizar_es_Empresa` (IN `estado` INT, IN `actualizar` INT)   BEGIN
        UPDATE empresa SET estado=estado where id=actualizar; 
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Set_modificar_datos_Revision` (IN `idre` INT, IN `propu` TEXT, IN `obser` TEXT)   BEGIN 
 
  UPDATE revision_mejora SET  	Observacion=obser,PropuestaMejora=propu  where id =idre;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Set_modificar_datos_usuario` (IN `idusuarioddd` INT, IN `USU` VARCHAR(20), IN `ROL` INT, IN `nombre` VARCHAR(50), IN `apellido` VARCHAR(50))   BEGIN 
 
  UPDATE usuarios SET  usu_nombre=USU,id_rol=ROL  where idusuario =idusuarioddd;
  UPDATE persona p SET  nombre=nombre,apellido =apellido  where id_usuario =idusuarioddd;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_registroMejora` (IN `observa` TEXT, IN `prpuesta` TEXT, IN `id_em` INT)   BEGIN 

INSERT INTO revision_mejora (id_empresa ,Observacion,PropuestaMejora )VALUES(  id_em, observa ,prpuesta);                        

 SELECT 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_registroverificacion_check` (IN `resul` TEXT, IN `info` TEXT, IN `id_em` INT)   BEGIN 

INSERT INTO verificacacion_check (id_empresa  ,ResultadosAudi,informafinal )VALUES(  id_em, resul ,info);                        

 SELECT 1;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Set_Registro_Actividades` (IN `id_em` INT, IN `fecha_Ini` DATE, IN `fecha_fi` DATE, IN `crono` VARCHAR(100), IN `matris` VARCHAR(100), IN `roles` VARCHAR(100), IN `acta` VARCHAR(100), IN `soli` VARCHAR(100), IN `avance` VARCHAR(100), IN `conclusion` VARCHAR(100), IN `aactaCierre` VARCHAR(100))   BEGIN 
  DECLARE CANTIDAD INT;
  SET @CANTIDAD:=(SELECT COUNT(*) from actividades where Cronograma =BINARY  crono ); 
  IF @CANTIDAD=0 THEN 
         INSERT INTO actividades(id_empresa,fechaInicioActividad,fechaFinActividad,Cronograma,
                                 matrizComparativa,registroRoles,ActaAperturaAudi,solicitudAcceso,avanceHallasgos,conclusionAudi,
                                actaCierre)
         VALUES(id_em, fecha_Ini,fecha_fi,crono , matris,roles,acta,soli,avance,conclusion,aactaCierre);
    
 SELECT 1;
 ELSE 
  SELECT 2;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_registro_empresa` (IN `razon` VARCHAR(150), IN `rucc` VARCHAR(50), IN `dire` VARCHAR(150), IN `tele` VARCHAR(20), IN `mail` VARCHAR(50), IN `geren` VARCHAR(150), IN `lo` VARCHAR(20))   BEGIN 
  DECLARE CANTIDAD INT;
  SET @CANTIDAD:=(SELECT COUNT(*) from empresa where ruc=BINARY rucc ); 
  IF @CANTIDAD=0 THEN 
      INSERT INTO empresa ( razonSocial, ruc, direccion,telefono, email, gerente, logo, estado) 
      VALUES(razon,rucc,dire,tele,mail,geren, lo, 1);                            
 SELECT 1;
 ELSE 
  SELECT 2;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_registro_palabras` (IN `option_key_initial` MEDIUMTEXT, IN `keywords_initial` MEDIUMTEXT, IN `replyMessage_response` MEDIUMTEXT, IN `trigger_response` MEDIUMTEXT, IN `media_response` MEDIUMTEXT)   BEGIN 
  DECLARE CANTIDAD INT;
  SET @CANTIDAD:=(SELECT COUNT(*) from initial where option_key=BINARY option_key_initial ); 
  IF @CANTIDAD=0 THEN 
      INSERT INTO initial (option_key,keywords) VALUES(option_key_initial,keywords_initial);

 SELECT 1;
 ELSE 
  SELECT 2;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Set_Registro_Planes` (IN `fecha_Ini` DATE, IN `fecha_fi` DATE, IN `id_em` INT, IN `filenameCronograma` VARCHAR(100), IN `nombreAlcanzable` VARCHAR(100))   BEGIN 
  DECLARE CANTIDAD INT;
  SET @CANTIDAD:=(SELECT COUNT(*) from plan where idempresa =BINARY   id_em ); 
  IF @CANTIDAD=0 THEN 
         INSERT INTO plan(fehaInicioAudi,fechaFinAudi,idempresa,cronogramaAudia,DocumentoAlcanceAudi)VALUES(fecha_Ini,fecha_fi,id_em,filenameCronograma,nombreAlcanzable);
    
         UPDATE empresa SET planEstado=1 where id=id_em; 
 SELECT 1;
 ELSE 
  SELECT 2;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Set_Registro_usuario` (IN `USU` VARCHAR(20), IN `CONTRA` VARCHAR(100), IN `ROL` INT, IN `nombre` VARCHAR(50), IN `apellido` VARCHAR(50))   BEGIN 
  DECLARE CANTIDAD INT;
  SET @CANTIDAD:=(SELECT COUNT(*) from usuarios where usu_nombre=BINARY USU ); 
  IF @CANTIDAD=0 THEN 
         INSERT INTO usuarios (usu_nombre,clave,id_rol,estado ) VALUES(USU, CONTRA ,ROL,1);
        SET @id_cliente =last_insert_id();
        INSERT INTO persona ( id_usuario, nombre, apellido) VALUES (@id_cliente, nombre, apellido);                           
 SELECT 1;
 ELSE 
  SELECT 2;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESTATUS_USUARIO` (IN `id_usuario` INT, IN `clie_estado` INT)   UPDATE usuarios SET estado=clie_estado where idusuario=id_usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_eliminar_Mejora` (IN `id_eliminar` INT)   DELETE from revision_mejora where id=id_eliminar$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_eliminar_verificacacion_check` (IN `id_eliminar` INT)   DELETE from verificacacion_check where id=id_eliminar$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificarUsuario` (IN `usu_nombre` VARCHAR(20))   select p.id_usuario, p.nombre,p.apellido , u.usu_nombre,u.clave,r.rol_nombre,  u.estado  from persona p
inner JOIN usuarios u on u.idusuario  = p.id_usuario 
inner join rol r on u.id_rol =r.rol_id WHERE u.usu_nombre  =BINARY usu_nombre$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `fechaInicioActividad` date NOT NULL,
  `fechaFinActividad` date NOT NULL,
  `Cronograma` varchar(100) NOT NULL,
  `matrizComparativa` varchar(100) NOT NULL,
  `registroRoles` varchar(100) NOT NULL,
  `ActaAperturaAudi` varchar(100) NOT NULL,
  `solicitudAcceso` varchar(100) NOT NULL,
  `avanceHallasgos` varchar(100) NOT NULL,
  `conclusionAudi` varchar(100) NOT NULL,
  `actaCierre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correo`
--

CREATE TABLE `correo` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico`
--

CREATE TABLE `diagnostico` (
  `id` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `fechaIniciodiagnostico` date NOT NULL,
  `fechaIfindiagnostico` date NOT NULL,
  `nivelEmpresa` int(11) NOT NULL,
  `DocumentoDiagnostico` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `pais` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `deparmentamento` varchar(50) NOT NULL,
  `codigoPostal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentosencontrados`
--

CREATE TABLE `documentosencontrados` (
  `id` int(11) DEFAULT NULL,
  `id_documento` int(11) NOT NULL,
  `cumple` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `razonSocial` varchar(150) NOT NULL,
  `ruc` varchar(50) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gerente` varchar(150) NOT NULL,
  `logo` varchar(20) NOT NULL,
  `estado` int(11) NOT NULL,
  `planEstado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`id`, `razonSocial`, `ruc`, `direccion`, `telefono`, `email`, `gerente`, `logo`, `estado`, `planEstado`) VALUES
(41, 'Einanciera Efectiva  ', '10474746127', 'calle los jirasoles 450', '012002890', 'efectiva@hotmail.com', 'Jorge Cachay ', '1047474612748.jpg', 1, 0),
(48, 'tttt', '88888888888888', '46rrr', '938207578', 'e0@gmail.com', 'ee', '88888888888888.jpg', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informefinal`
--

CREATE TABLE `informefinal` (
  `id` int(10) NOT NULL,
  `id_auditor` int(10) NOT NULL,
  `requisitos` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `auditor` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `lineamientos` text NOT NULL,
  `cimple` varchar(10) NOT NULL,
  `documentoInformefinal` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `id_usuario`, `nombre`, `apellido`) VALUES
(18, 27, 'Marry', 'Rabanal'),
(19, 28, 'Erika', 'Vasquez Arrollo '),
(20, 29, 'admin', 'admin'),
(22, 31, 'Junior', 'Cachay Maco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `fehaInicioAudi` date NOT NULL,
  `fechaFinAudi` date NOT NULL,
  `idempresa` int(11) NOT NULL,
  `cronogramaAudia` varchar(100) NOT NULL,
  `DocumentoAlcanceAudi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revision_mejora`
--

CREATE TABLE `revision_mejora` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `Observacion` text NOT NULL,
  `PropuestaMejora` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `rol_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `rol_nombre`) VALUES
(1, 'Administrador'),
(2, 'empleado'),
(3, 'cliente'),
(4, 'Auditor'),
(5, 'Director Ingeniería Software');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `numero` varchar(9) NOT NULL,
  `operador` varchar(20) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `usu_nombre` varchar(20) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `usu_ultimoacceso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `usu_nombre`, `clave`, `id_rol`, `usu_ultimoacceso`, `estado`) VALUES
(27, 'marry', '$2y$10$CzIykOto7hxUxrCUBg2q1emP4Lcox2ujX.BjRvxGL0tYmSwL0hdZG', 5, '2022-11-29 17:03:33', 1),
(28, 'erika', '$2y$10$SLh4j1EJxjbYEpCOxsXvsOu24j6WEZUt5ILXUaC8ezilZn0GRwgsK', 1, '2022-11-30 23:07:27', 1),
(29, 'admin', '$2y$10$HsfnsbFRxPJM8IUqT4on2e.5.Hl5kprPYA6HSvSIkBoBmyI8IisVW', 1, '2022-11-24 03:43:56', 1),
(31, 'Junior', '$2y$10$47cdI/C5sSglp4Ax7r5U..oBhbmfpxpEg8TbbK/Qs1iYct2eTGVZi', 5, '2022-11-30 23:11:51', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verificacacion_check`
--

CREATE TABLE `verificacacion_check` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `ResultadosAudi` text NOT NULL,
  `informafinal` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verificar`
--

CREATE TABLE `verificar` (
  `id` int(11) NOT NULL,
  `postDiagnosticoAudi` varchar(100) NOT NULL,
  `indicadorSatisfaccion` varchar(100) NOT NULL,
  `NivelEmpresa` int(11) NOT NULL,
  `Id_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Empresa` (`id_empresa`);

--
-- Indices de la tabla `correo`
--
ALTER TABLE `correo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkuser` (`id_usuario`);

--
-- Indices de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pla` (`id_plan`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usesss` (`id_usuario`);

--
-- Indices de la tabla `documentosencontrados`
--
ALTER TABLE `documentosencontrados`
  ADD KEY `fk_documentos` (`id_documento`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `informefinal`
--
ALTER TABLE `informefinal`
  ADD KEY `fk_au` (`id_auditor`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_per` (`id_usuario`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkemmm` (`idempresa`);

--
-- Indices de la tabla `revision_mejora`
--
ALTER TABLE `revision_mejora`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usertel` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD KEY `fk_rol` (`id_rol`);

--
-- Indices de la tabla `verificacacion_check`
--
ALTER TABLE `verificacacion_check`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_emmmm` (`id_empresa`);

--
-- Indices de la tabla `verificar`
--
ALTER TABLE `verificar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_empresaa` (`Id_empresa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `correo`
--
ALTER TABLE `correo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `revision_mejora`
--
ALTER TABLE `revision_mejora`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `telefono`
--
ALTER TABLE `telefono`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `verificacacion_check`
--
ALTER TABLE `verificacacion_check`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `verificar`
--
ALTER TABLE `verificar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `FK_Empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id`);

--
-- Filtros para la tabla `correo`
--
ALTER TABLE `correo`
  ADD CONSTRAINT `fkuser` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Filtros para la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD CONSTRAINT `fk_pla` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id`);

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `fk_usesss` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Filtros para la tabla `documentosencontrados`
--
ALTER TABLE `documentosencontrados`
  ADD CONSTRAINT `fk_documentos` FOREIGN KEY (`id_documento`) REFERENCES `verificar` (`id`);

--
-- Filtros para la tabla `informefinal`
--
ALTER TABLE `informefinal`
  ADD CONSTRAINT `fk_au` FOREIGN KEY (`id_auditor`) REFERENCES `persona` (`id`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fk_per` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `fkemmm` FOREIGN KEY (`idempresa`) REFERENCES `empresa` (`id`);

--
-- Filtros para la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD CONSTRAINT `fk_usertel` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
