-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2021 a las 12:22:49
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(1, 9, 7),
(6, 15, 14),
(7, 15, 15);

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
(7, '202cb962ac59075b964b07152d234b70', 'eustakio222'),
(8, 'a08372b70196c21a9229cf04db6b7ceb', 'Alex'),
(9, '6c8349cc7260ae62e3b1396831a8398f', 'hola'),
(14, '202cb962ac59075b964b07152d234b70', 'prueba4'),
(15, '202cb962ac59075b964b07152d234b70', 'prueba5');

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
(1, 2, 'bombas'),
(2, 1, 'flechas'),
(3, 2, 'pocionP'),
(4, 3, 'pocionM'),
(5, 4, 'pocionG'),
(6, 0, 'dinero');

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
(1, 1, 1),
(1, 6, 0),
(1, 7, 0),
(2, 1, 2),
(2, 6, 0),
(2, 7, 2),
(3, 1, 1),
(3, 6, 0),
(3, 7, 0),
(4, 1, 1),
(4, 6, 0),
(4, 7, 1),
(5, 1, 1),
(5, 6, 0),
(5, 7, 0),
(6, 1, 3),
(6, 6, 0),
(6, 7, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso`
--

CREATE TABLE `progreso` (
  `codigo_progreso` int(11) NOT NULL,
  `posicion_x` int(11) DEFAULT NULL,
  `posicion_y` int(11) DEFAULT NULL,
  `castillo_desbloqueado` tinyint(1) NOT NULL,
  `cueva_desbloqueada` tinyint(1) NOT NULL,
  `hacha_recogida` tinyint(1) NOT NULL,
  `nivel_anterior` int(11) NOT NULL,
  `nivel_actual` int(11) NOT NULL,
  `id_jugadores` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `progreso`
--

INSERT INTO `progreso` (`codigo_progreso`, `posicion_x`, `posicion_y`, `castillo_desbloqueado`, `cueva_desbloqueada`, `hacha_recogida`, `nivel_anterior`, `nivel_actual`, `id_jugadores`) VALUES
(1, 0, 0, 0, 0, 0, 0, 1, 14),
(2, NULL, NULL, 0, 1, 1, 0, 2, 15);

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
  MODIFY `codigo_inventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `codigo_jugadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `objetos`
--
ALTER TABLE `objetos`
  MODIFY `codigo_objetos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `progreso`
--
ALTER TABLE `progreso`
  MODIFY `codigo_progreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
