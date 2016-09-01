<?php

function twigExtensionFunctions(\Twig_Environment &$twig) {
    /**
    *   Meta Functions
    *   /vendor/pmd/mdma/src/Bridge/Twig/Extension.php
    */

    $twig->addFunction('meta_set_attribute', new \Twig_SimpleFunction('meta_set_attribute', function ($context, $destination) {}));
    $twig->addFunction('meta_get_attribute', new \Twig_SimpleFunction('meta_get_attribute', function ($context) {}));
    $twig->addFunction('meta_render_attribute', new \Twig_SimpleFunction('meta_render_attribute', function ($context, $destination) {}));
    $twig->addFunction('meta_set_attributes', new \Twig_SimpleFunction('meta_set_attributes', function ($context, $destination) {}));
    $twig->addFunction('meta_add_attributes', new \Twig_SimpleFunction('meta_add_attributes', function ($context) {}));
    $twig->addFunction('meta_get_attributes', new \Twig_SimpleFunction('meta_get_attributes', function ($context, $destination) {}));
    $twig->addFunction('meta_render', new \Twig_SimpleFunction('meta_render', function ($context) {}));

    /**
    *   Path Functions
    *   /vendor/symfony/symfony/src/Symfony/Bridge/Twig/Extension/RoutingExtension.php
    */
    $twig->addFunction('url', new \Twig_SimpleFunction('url', function ($context) {
        $json_source = file_get_contents('../../../telfront2/project.routes.json');
        $json_data = json_decode($json_source, true);
        foreach($json_data as $v){
            if($v['route'] == $context){
                return $v['path'];
            }
        }
        return $context;
    }));
    $twig->addFunction('path', new \Twig_SimpleFunction('path', function ($context) {
        return '#';
    }));
    $twig->addFunction('cpath', new \Twig_SimpleFunction('cpath', function ($context) {
        return '#';
    }));
    $twig->addFunction('controller', new \Twig_SimpleFunction('controller', function ($context) {
        return $context;
    }));

    /**
    *   PMDfp Functions
    *   /vendor/pmd/gdfp-ad-server/src/Bridge/Twig/PMDfpExtension.php
    */
    $twig->addFunction('pmd_dfp_ad', new \Twig_SimpleFunction('pmd_dfp_ad', function ($context) {}));
    $twig->addFunction('pmd_dfp_init_tag', new \Twig_SimpleFunction('pmd_dfp_init_tag', function ($context, $destination) {}));


    $twig->addFunction('render_esi', new \Twig_SimpleFunction('render_esi', 'customRender', array(
            'is_safe' => array('html'),
            'needs_environment' => true
    )));
    $twig->addFunction('xiti_level', new \Twig_SimpleFunction('xiti_level', function ($context, $destination) {}));
    $twig->addFunction('xiti_chapters', new \Twig_SimpleFunction('xiti_chapters', function () {}));
    $twig->addFunction('xiti_config', new \Twig_SimpleFunction('xiti_config', function ($context, $destination) {}));
    $twig->addFunction('xiti_level', new \Twig_SimpleFunction('xiti_level', function ($context, $destination) {}));
    $twig->addFunction('xiti_level', new \Twig_SimpleFunction('xiti_level', function () {}));

};

function customRender(\Twig_Environment &$twig, $context){
    return $twig->render($context);
};
