/**
 * animation module
 */
define(['ojs/ojcore', 'knockout', 'https://static.sketchfab.com/api/sketchfab-viewer-1.0.0.js',
  'three'
], function (oj, ko, Sketchfab, Three) {
    /**
     * The view model for the animation view template
     */

    function AnimationViewModel() {

        var self = this;

        var initialY = Math.PI / 2;
        var degree90 = +(Math.PI / 2);
        var degree90Left = -(Math.PI / 2);
        var degree = (Math.PI / 180);

        var inputPitch;
        var inputYaw;
        var inputRoll;

        var camera = new Three.PerspectiveCamera( 75, 800 / 600, 0.1, 1000 );
        var renderer = new Three.WebGLRenderer({antialias: true});
        var scene = new Three.Scene();
        var pointLight = new Three.PointLight( 0xffffff, 0.8 );
        var loader = new Three.GLTFLoader();
        var drone;
        
        // var material = new Three.MeshStandardMaterial({metalness: 0, roughness: 0.5});
        var material = new Three.MeshNormalMaterial();

        var buttonClicked = false;

        self.onClick = function(pitch, yaw, roll) {

            inputPitch = pitch;
            inputYaw = yaw;
            inputRoll = roll;
            buttonClicked = true;

        };

        

        self.handleAttached = function(info) {
            
            renderer.setSize(800, 600);
            document.getElementById('droneContainer').appendChild( renderer.domElement );

            scene.add(new Three.AmbientLight(0xffffff,1));
            camera.add( pointLight );

            loader.load(
                'model/drone.gltf',
                function ( gltf ) {

                    gltf.scene.traverse(function (node) {

                        if (node instanceof Three.Mesh) {
                            node.material = material;
                            node.rotation.y = initialY;
                        }

                    });

                    drone = gltf;

                    scene.add( drone.scene );

                    // gltf.animations; // Array<THREE.AnimationClip>
                    // gltf.scene; // THREE.Scene
                    // gltf.scenes; // Array<THREE.Scene>
                    // gltf.cameras; // Array<THREE.Camera>
                    // gltf.asset; // Object

                },
                // called while loading is progressing
                function ( xhr ) {

                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

                },
                // called when loading has errors
                function ( error ) {

                    console.log( 'An error happened' );
                    console.log( error );

                }
            );

            camera.position.z = 7;

            function animate() {
                requestAnimationFrame( animate );
                if (drone) {
                    checkTurn();
                    // drone.scene.rotation.x += 0.01;
                    // drone.scene.rotation.y += 0.01;
                    // drone.scene.rotation.z += 0.01;
                }
                renderer.render( scene, camera );
            }

            animate();

        };

        function checkTurn() {
            if (buttonClicked) {
                drone.scene.rotation.x += (degree * inputPitch);
                drone.scene.rotation.y += (degree * inputYaw);
                drone.scene.rotation.z += (degree * inputRoll);
                buttonClicked = false;
            }
        };

    }
    
    return new AnimationViewModel();

});