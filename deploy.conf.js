module.exports = {
    assetsPath: '/',

    front: {
        enabled: false,
        host: '', //host address
        username: 'root',
        privateKey: '../../.ssh/id_rsa',
        dest: '/var/www/html/PROJECT FOLDER' //destination directory on host
    },

    wp: {
        enabled: false,
        host: '',
        username: '',
        password: '',
        dest: ''
    }

};
