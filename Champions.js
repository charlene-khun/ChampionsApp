// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-c01ab-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsinDB = ref(database, "Endorsements")

const inputEl = document.getElementById("input")
const buttonEl = document.getElementById("publish-button")
const endorsementsEl = document.getElementById("endorsements")

buttonEl.addEventListener("click", function()
{
    let inputValue = inputEl.value
    push(endorsementsinDB, inputValue)
    clearInputFieldEl()
})

onValue(endorsementsinDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementsEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorsementsEl(currentItem)
        }    
    } else {
        endorsementsEl.innerHTML = "No items here... yet"
    }
})

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputEl.value = ""
}

function appendItemToEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `Endorsements/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsementsEl.append(newEl)
}
