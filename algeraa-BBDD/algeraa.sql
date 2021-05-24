-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2021 a las 13:55:10
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `algeraa`
--
CREATE DATABASE IF NOT EXISTS `algeraa` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `algeraa`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `codigo_inventario` int(11) NOT NULL,
  `peso` int(11) NOT NULL,
  `id_jugadores` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`codigo_inventario`, `peso`, `id_jugadores`) VALUES
(1, 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `codigo_jugadores` int(11) NOT NULL,
  `contrasenia` varchar(50) NOT NULL,
  `usuario` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`codigo_jugadores`, `contrasenia`, `usuario`) VALUES
(1, '123', 'Eusebio'),
(2, '34', 'Alfonso'),
(3, '123', 'pepe'),
(4, '125', 'amuno'),
(5, '202cb962ac59075b964b', 'aaronix'),
(7, '202cb962ac59075b964b07152d234b70', 'eustakio222');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetos`
--

CREATE TABLE `objetos` (
  `codigo_objetos` int(11) NOT NULL,
  `peso` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `objetos`
--

INSERT INTO `objetos` (`codigo_objetos`, `peso`, `nombre`) VALUES
(1, 2, 'bombas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posesion`
--

CREATE TABLE `posesion` (
  `id_objetos` int(11) NOT NULL,
  `id_inventario` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `posesion`
--

INSERT INTO `posesion` (`id_objetos`, `id_inventario`, `cantidad`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso`
--

CREATE TABLE `progreso` (
  `codigo_progreso` int(11) NOT NULL,
  `posicion_x` int(11) NOT NULL,
  `posicion_y` int(11) NOT NULL,
  `castillo_desbloqueado` tinyint(1) NOT NULL,
  `cueva_desbloqueada` tinyint(1) NOT NULL,
  `hacha_recogida` tinyint(1) NOT NULL,
  `nivel_anterior` int(11) NOT NULL,
  `nivel_actual` int(11) NOT NULL,
  `id_jugadores` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`codigo_inventario`),
  ADD KEY `id_jugadores` (`id_jugadores`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`codigo_jugadores`);

--
-- Indices de la tabla `objetos`
--
ALTER TABLE `objetos`
  ADD PRIMARY KEY (`codigo_objetos`);

--
-- Indices de la tabla `posesion`
--
ALTER TABLE `posesion`
  ADD PRIMARY KEY (`id_objetos`,`id_inventario`),
  ADD KEY `id_inventario` (`id_inventario`);

--
-- Indices de la tabla `progreso`
--
ALTER TABLE `progreso`
  ADD PRIMARY KEY (`codigo_progreso`),
  ADD KEY `id_jugadores` (`id_jugadores`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `codigo_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `codigo_jugadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `objetos`
--
ALTER TABLE `objetos`
  MODIFY `codigo_objetos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `progreso`
--
ALTER TABLE `progreso`
  MODIFY `codigo_progreso` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_jugadores`) REFERENCES `jugadores` (`codigo_jugadores`);

--
-- Filtros para la tabla `posesion`
--
ALTER TABLE `posesion`
  ADD CONSTRAINT `posesion_ibfk_1` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`codigo_inventario`),
  ADD CONSTRAINT `posesion_ibfk_2` FOREIGN KEY (`id_objetos`) REFERENCES `objetos` (`codigo_objetos`);

--
-- Filtros para la tabla `progreso`
--
ALTER TABLE `progreso`
  ADD CONSTRAINT `progreso_ibfk_1` FOREIGN KEY (`id_jugadores`) REFERENCES `jugadores` (`codigo_jugadores`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
