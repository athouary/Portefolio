// Expose jQuery to the global (window) namespace
require('expose?$!expose?jQuery!jquery');

// import Main JS
import '../assets/scripts/main';

// import Main CSS
import  '../assets/styles/main';

// // import Main Images
import '../assets/images/sample.jpg';

// // import Component/Page
import Home from 'template/components/home/config';

// // import Shared Component
import Header from 'template/shared/header/config';
