let dogBar;
let dogData;
let dogInfo;

document.addEventListener("DOMContentLoaded",()=>{
    dogBar = document.getElementById("dog-bar")


    fetch(" http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(data => {
        dogData = data 
        dogData.forEach(item=>{
            const spanName = document.createElement("span")
            spanName.innerText = item.name
           const idName= spanName.setAttribute('id', item.name)
            dogBar.append(spanName)
        })

        dogBar.addEventListener("click", (e)=>{
           const name = e.target.innerText

            dogInfo = document.getElementById("dog-info")
            dogInfo.innerText = ""

           const itemName = dogData.find(item => {
            return name === item.name 
           })
           const isGoodDog = itemName.isGoodDog

           const dogImage = document.createElement('img')
           dogImage.setAttribute('src', itemName.image)
           dogInfo.append(dogImage)

           const dogHeader = document.createElement('h2')
           dogHeader.innerText = itemName.name
           dogInfo.append(dogHeader)

           const dogButton = document.createElement("button")
           dogButton.innerText = itemName.isGoodDog ? 'Good Dog!' : "Bad Dog!"
           dogInfo.append(dogButton)

           dogButton.addEventListener('click', ()=> {
            fetch(`http://localhost:3000/pups/${itemName.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !isGoodDog
               }),
            })
            .then((r)=> r.json())
            .then(newData => {
                dogButton.innerText = newData.isGoodDog ? 'Good Dog!' : "Bad Dog!"
                console.log(newData)
            })
           })
        })
        const buttonGood = document.getElementById('dog-info')
        console.log(buttonGood)
    })
    
});
