pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "khadijagougou"
        BACKEND_IMAGE = "backend-app"
        FRONTEND_IMAGE = "frontend-app"
        TAG = "${BUILD_NUMBER}"
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
                sh """
                    docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:$TAG ./backend
                    docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE:$TAG ./frontend
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh """
                        echo $PASS | docker login -u $USER --password-stdin

                        docker push $DOCKERHUB_USER/$BACKEND_IMAGE:$TAG
                        docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:$TAG
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl apply -f k8s/

                    kubectl set image deployment/backend backend=$DOCKERHUB_USER/$BACKEND_IMAGE:$TAG
                    kubectl set image deployment/frontend frontend=$DOCKERHUB_USER/$FRONTEND_IMAGE:$TAG

                    kubectl rollout status deployment/backend
                    kubectl rollout status deployment/frontend
                """
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