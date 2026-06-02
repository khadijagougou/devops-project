pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "backend-app"
        FRONTEND_IMAGE = "frontend-app"
        DOCKERHUB_USER = "khadijagougou"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'develop', url: 'https://github.com/khadijagougou/devops-project.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE ./backend'
                sh 'docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                 usernameVariable: 'USER',
                 passwordVariable: 'PASS')]) {
                    sh '''
                        echo $PASS | docker login -u $USER --password-stdin

                        docker push $DOCKERHUB_USER/$BACKEND_IMAGE
                        docker push $DOCKERHUB_USER/$FRONTEND_IMAGE
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline réussi'
        }
        failure {
            echo 'Pipeline échoué'
        }
    }
}