<?php

class ImageHelper {
    public function getHost(){
        /**
        * ATTENTION, l'url http://localhost:3000 est configurée en dur dans la config de Webpack
        */
        $json = file_get_contents('http://localhost:3000/configPhp');
        $obj = json_decode($json);
        return $obj->configPhp->urlStaticImages;
    }

    public function imageResize($type, $image, $width, $height, $parameters, $title = null, $format = null){
        $host = ImageHelper::getHost();

        $transformation = $type;

        // Calculate the width or height if either is null
        if (null !== $width && null == $height) {
            $height = round($width * $image['height'] / $image['width']);
        } elseif (null == $width && null !== $height) {
            $width = round($height * $image['width'] / $image['height']);
        }

        // Inlining parameters
        array_walk($parameters, function (&$value, $key) { $value = sprintf('%s/%s', $key, urlencode($value)); });
        $parameters = implode('/', $parameters);

        // Slugify the title
        $replacements = array(
            'A' => 'ÀÁÂÃÄÅ', 'a' => 'àáâãäå', 'O' => 'ÒÓÔÕÖØ', 'o' => 'òóôõöø', 'E' => 'ÈÉÊË', 'e' => 'èéêë',
            'C' => 'Ç', 'c' => 'ç', 'I' => 'ÌÍÎÏ', 'i' => 'ìíîï', 'U' => 'ÙÚÛÜ', 'u' => 'ùúûü', 'y' => 'ÿý',
            'N' => 'Ñ', 'n' => 'ñ', 'OE' => 'Œ', 'oe' => 'œ',
        );
        foreach ($replacements as $replacement => $pattern) {
            $title = preg_replace('~['.$pattern.']~u', $replacement, $title);
        }
        $title = strtolower($title);
        // remplacement des caractères non alphanumérique par un tiret (juste un et pas en début ou fin de ligne)
        $title = preg_replace(
            array('~[^a-z0-9]~', '~-{2,}~', '~-$~', '~^-~',),
            array($separator,$separator,'','',),
            $title
        );

        // Computing the urlTemplate with all the vars
        $url = str_replace(
            ['{host}', '{transformation}', '{width}', '{height}', '{parameters}', '{title}', ".".$image['extension']],
            [$host, $transformation, $width, $height, $parameters, $title, ".".$format],
            $image['urlTemplate']
        );
        return $url;
    }

    function imagePad(\Twig_Environment $twig, $image, $width = null, $height = null, array $parameters = [], $title = null, $format = null){
        return ImageHelper::imageResize("pad", $image, $width, $height, $parameters, $title, $format);
    }

    function imageFit(\Twig_Environment $twig, $image, $width = null, $height = null, array $parameters = [], $title = null, $format = null){
        return ImageHelper::imageResize("fit", $image, $width, $height, $parameters, $title, $format);
    }
}

function twigExtensionFilters(\Twig_Environment &$twig) {
    /**
    *   Image Filters
    *   /src/PMD/TEL/FrontBundle/Twig/ResizerExtension.php
    */

    $twig->addFilter('image_fit', new \Twig_SimpleFilter('image_fit', array('ImageHelper', 'imageFit'), array(
            'is_safe' => array('html'),
            'needs_environment' => true
    )));
    $twig->addFilter('image_pad', new \Twig_SimpleFilter('image_pad', array('ImageHelper', 'imagePad'), array(
            'is_safe' => array('html'),
            'needs_environment' => true
    )));

    /**
    *   Image Filters
    *   /src/PMD/TEL/FrontBundle/Twig/ReplaceImageTemplateExtension.php
    */

    $twig->addFilter('replace_image_template', new \Twig_SimpleFilter('replace_image_template', function ($context, $destination) {}));

    /**
    *   Locale Filters
    *   /vendors/twig/extensions/twig/lib/Twig/Extensions/Extension/Intl.php
    */

    $twig->addFilter('localizeddate', new \Twig_SimpleFilter('localizeddate', function ($context, $destination) {}));

    /**
    *   Router Filters
    *   /src/PMD/TEL/FrontBundle/Twig/RouterExtension.php
    */

    $twig->addFilter('resource_url', new \Twig_SimpleFilter('resource_url', function ($context) {
        return '#';
    }));
    $twig->addFilter('category_url', new \Twig_SimpleFilter('category_url', function ($context) {
        return '#';
    }));


    $twig->addFilter('cdnify', new \Twig_SimpleFilter('cdnify', function ($context) {
        return $context;
    }));
    $twig->addFilter('linkbooster_url', new \Twig_SimpleFilter('linkbooster_url', function ($context) {}));


    $twig->addFilter('shorten', new \Twig_SimpleFilter('shorten', function ($context) {
        return $context;
    }));

};
