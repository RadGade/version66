const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()


exports.addTeacherRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            teacher : true
        })
    }).then(() => {
        return {
            message : `Yayyy!! ${data.email} is a teacher`
        }
    }).catch((err) => {
        return err
    })
})


exports.addStudentRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            teacher : false
        })
    }).then(() => {
        return {
            message : `Yayyy!! ${data.email} is a student`
        }
    }).catch((err) => {
        return err
    })
})
