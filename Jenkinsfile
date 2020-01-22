pipeline {
    agent none
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        DOCKER_REGISTER = credentials('jenkins-blog-docker-register')
        CI = 'true' 
    }
    stages {
        stage('Npm install') {
            agent {
                docker {
                    image 'node:12.14.0-stretch'
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Test') { 
            agent {
                docker {
                    image 'node:12.14.0-stretch'
                }
            }
            steps {
                sh 'npm run test' 
            }
        }
        stage('Dockerize') {
            agent {
                docker {
                    image 'docker:19.03.5'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh "ls"
                sh "docker build . -t $DOCKER_REGISTER/jellyfish-web:v0.0.$BUILD_NUMBER"
            }
        }
        stage('Publish image') {
            agent {
                docker {
                    image 'docker:19.03.5'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'docker push $DOCKER_REGISTER/jellyfish-web:v0.0.$BUILD_NUMBER'
                sh 'echo "$DOCKER_REGISTER/jellyfish-web:v0.0.$BUILD_NUMBER" > .artifacts'
                archiveArtifacts(artifacts: '.artifacts')
            }
        }
        stage('Remove image') {
            agent {
                docker {
                    image 'docker:19.03.5'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh "docker image rm $DOCKER_REGISTER/jellyfish-web:v0.0.$BUILD_NUMBER"
            }
        }
    }
    post {
        always {
            rocketSend currentBuild.currentResult
        }
    }
}