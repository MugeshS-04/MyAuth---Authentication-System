pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mugeshs04/myauth'
        DOCKER_TAG = 'latest'
    }

    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MugeshS-04/MyAuth---Authentication-System.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('client') {
                    script {
                        docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", ".")
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }
    }
}
