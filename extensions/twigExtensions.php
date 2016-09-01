<?php

function twigExtensions(\Twig_Environment &$twig) {
    date_default_timezone_set('Europe/Paris');
    $twig->enableDebug();
    $twig->addExtension(new \Twig_Extension_Debug());
};
