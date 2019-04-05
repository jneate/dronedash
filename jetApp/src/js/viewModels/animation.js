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

        var startX;
        var startY;
        var startZ;
        
        var material = new Three.MeshNormalMaterial();

        var buttonXClicked = false;
        var buttonYClicked = false;
        var buttonZClicked = false;

        self.onMessage = function(pitch, yaw, roll, gaz) {

            inputGaz = gaz;
            inputYaw = yaw;
            inputRoll = roll;

            startX = drone.scene.rotation.x;
            startY = drone.scene.rotation.y;
            startZ = drone.scene.rotation.z;

            buttonXClicked = true;
            buttonYClicked = true;
            buttonZClicked = true;

        };

        

        self.handleAttached = function(info) {
            
            renderer.setSize(800, 600);
            document.getElementById('droneContainer').appendChild(renderer.domElement);

            scene.add(new Three.AmbientLight(0xffffff,1));
            camera.add(pointLight);

            loader.load(
                'model/drone.gltf',
                function (gltf) {

                    gltf.scene.traverse(function (node) {

                        if (node instanceof Three.Mesh) {
                            node.material = material;
                            node.rotation.y = initialY;
                        }

                    });

                    drone = gltf;

                    scene.add(drone.scene);

                    // gltf.animations; // Array<THREE.AnimationClip>
                    // gltf.scene; // THREE.Scene
                    // gltf.scenes; // Array<THREE.Scene>
                    // gltf.cameras; // Array<THREE.Camera>
                    // gltf.asset; // Object

                },
                // called while loading is progressing
                function (xhr) {

                    console.log((xhr.loaded / xhr.total * 100 ) + '% loaded');

                },
                // called when loading has errors
                function (error) {

                    console.log(error);

                }
            );

            camera.position.z = 7;

            function animate() {

                requestAnimationFrame(animate);

                if (drone) {
                    checkX();
                    checkY();
                    checkZ();
                }

                renderer.render(scene, camera);
            }

            animate();

        };

        function checkX() {
            if (buttonXClicked) {
                
                if (drone.scene.rotation.x < (startX + (degree * inputGaz))) {
                    drone.scene.rotation.x += 0.02;
                } else {
                    drone.scene.rotation.x = (startX + (degree * inputGaz));
                    buttonXClicked = false;
                }

            }
        }

        function checkY() {
            if (buttonYClicked) {
                
                if (drone.scene.rotation.y < (startY + (degree * inputYaw))) {
                    drone.scene.rotation.y += 0.02;
                } else {
                    drone.scene.rotation.y = (startY + (degree * inputYaw));
                    buttonYClicked = false;
                }

            }
        }

        function checkZ() {
            if (buttonZClicked) {
                
                if (drone.scene.rotation.z < (startZ + (degree * inputRoll))) {
                    drone.scene.rotation.z += 0.02;
                } else {
                    drone.scene.rotation.z = (startZ + (degree * inputRoll));
                    buttonZClicked = false;
                }

            }
        }

    }
    
    return new AnimationViewModel();

});