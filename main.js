(function() {
    let scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.shadowMap.enable = true;
    renderer.shadowMap.soft = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    camera.position.z = 60;
    camera.position.y = 2;

    let planeGeometry = new THREE.PlaneGeometry(200, 900);
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(- Math.PI / 2));

    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x222222
    });

    let plane = new THREE.Mesh(planeGeometry, groundMaterial);
    plane.receiveShadow = true;

    let mesh;

    let loader = new THREE.TextureLoader();

    loader.load('texture.jpg', function (texture) {
        let geometry = new THREE.SphereGeometry(20, 100, 100);

        let material = new THREE.MeshBasicMaterial({
            map: texture
        });

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 25;

        mesh.castShadow = true;

        scene.add(mesh);
    });

    //let geometry = new THREE.BoxGeometry(10, 10, 10);

    //let mesh = new THREE.Mesh(geometry, groundMaterial);

    let pointLight = new THREE.PointLight(0xdfebff);
    pointLight.position.y = 60;
    pointLight.position.z = 20;

    pointLight.castShadow = true;

    let helper = new THREE.CameraHelper(pointLight.shadow.camera);

    scene.background = new THREE.Color(0xeeeeee);
    //scene.add(mesh);
    scene.add(helper);
    scene.add(plane);
    scene.add(pointLight);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    function loop() {
        requestAnimationFrame(loop);
        mesh.rotation.y += 0.01;
        mesh.rotation.z += 0.02;
        renderer.render(scene, camera);
    }

    loop();
})();