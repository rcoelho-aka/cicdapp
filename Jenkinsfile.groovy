pipeline {
    agent any
    stages ('Exemple') {
        steps {
            echo 'Hello World'
        }
    }
}
}