// Tracker class
class TrackerCalories{
    constructor(){
        this._caloriesLimit = 2000
        this._totalCalories = 0
        this._meals = []
        this._workouts = []

        this._displayCaloriesProgress()
        this._displayCaloriesRemaining()
        this._displayCaloriesConsumed()
        this._displayCaloriesTotal()
        this._displayCaloriesLimit()
        this._displayCaloriesBurned()
    }
    // Plubic methods

    addMeal(meal){
        this._meals.push(meal)
        this._totalCalories += meal.calories
        this._displayNewMeal(meal)
        this._render()
    }
    addWorkout(workout){
        this._workouts.push(workout)
        this._totalCalories -= workout.calories
        this._displayNewWorkout(workout)
        this._render()
    }
    removeMeal(id){
        // we are looping through the meals array and we take each meal and check if the meal.id is the same with the id we passed in removeMeal(id)
        const index = this._meals.findIndex((meal) => meal.id === id)
        //if meal.id match with id the index will be the meal order in the Array - > meals[{'Orez'}, {'Pui'}] meals[{0}, {1}] meals[{index}, {index}]
        if(index !== -1){
            const meal = this._meals[index]
            // here the meal become the object from the array
            this._totalCalories -= meal.calories
            // remove the meal from the array index is the object we want to remove and 1 is the number we want to remove in this case 1 object.
            this._meals.splice(index, 1)
            this._render()
        }
    }
    removeWorkout(id){
        
        const index = this._workouts.findIndex((workout) => workout.id === id)
    
        if(index !== -1){
            const workout = this._workouts[index]
            this._totalCalories += workout.calories
            this._workouts.splice(index, 1)
            this._render()
        }
    }

    reset(){
        this._totalCalories = 0
        this._meals = []
        this._workouts = []
        this._render()
    }

    // Private methods
    _displayCaloriesTotal(){
        const caloriesTotalEl = document.querySelector('.total-calories')
        caloriesTotalEl.innerHTML = this._totalCalories
    }

    _displayCaloriesLimit(){
        const caloriesLimitEl = document.querySelector('.calories-limit')
        caloriesLimitEl.innerHTML = this._caloriesLimit
    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.querySelector('.meal')
        // reduce(total va fi 0 la prima rulare setat de noi  si se va aduna cu meal.calories.)
        // total va primi valoarea calcului iar daca vor fi mai multe meal total va fi rezultatul anterior a calcului. 0 + 100 = 100. daca sunt 2 mese 100 + a doua masa = ...
        const caloriesConsumed = this._meals.reduce((total,meal) => total + meal.calories, 0)

        caloriesConsumedEl.innerHTML = caloriesConsumed
    }
    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.querySelector('.workout')
       
        const caloriesBurned = this._workouts.reduce((total,workout) => total + workout.calories, 0)

        caloriesBurnedEl.innerHTML = caloriesBurned
    }
    _displayCaloriesRemaining(){
        const caloriesRemainingEl = document.querySelector(".calories-remaining")

        const remaining = this._caloriesLimit - this._totalCalories
        caloriesRemainingEl.innerHTML = remaining
    }
    _displayCaloriesProgress(){
        const progresEl = document.querySelector("#calorie-progress")
        const percentage = (this._totalCalories / this._caloriesLimit) * 100
        const width = Math.min(percentage, 100)
        progresEl.style.width = `${width}%`
    }

    _displayNewMeal(meal){
        const mealDiv = document.createElement('div')
        const divForMeal = document.querySelector('.meal-div')
        mealDiv.classList.add('card')
        mealDiv.setAttribute('data-id', meal.id)

        mealDiv.innerHTML = `
        <h1>${meal.name}</h1>
        <h1>${meal.calories}</h1>
        <button class="remove-meal">X</button>
        `

        divForMeal.append(mealDiv)
    }
    _displayNewWorkout(workout){
        const workoutDiv = document.createElement('div')
        const divForWorkout = document.querySelector('.workout-div')
        workoutDiv.classList.add('card')
        workoutDiv.setAttribute('data-id', workout.id)
        workoutDiv.innerHTML = `
        <h1>${workout.name}</h1>
        <h1>${workout.calories}</h1>
        <button class="remove-workout">X</button>
        `

        divForWorkout.append(workoutDiv)
    }

    _render(){
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayCaloriesProgress()
    }
}



class Meal{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2)
        this.name = name
        this.calories = calories
    }
}
class Workout{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2)
        this.name = name
        this.calories = calories
    }
}

class App{
    constructor(){
        this._tracker = new TrackerCalories()
        // pass in argument which will be the type of item
        // we use bind(this) bcs if we use this in the function without bind the this(key) don't mean the App
        document.querySelector('.meal-form').addEventListener('submit', this._addNewItem.bind(this, "meal"))
        document.querySelector('.workout-form').addEventListener('submit', this._addNewItem.bind(this, "workout"))

        document.querySelector('.meal-div')
        .addEventListener('click', this._removeItem.bind(this, 'meal'))
        document.querySelector('.workout-div')
        .addEventListener('click', this._removeItem.bind(this, 'workout'))

        document.querySelector('.meal-filter')
        .addEventListener('keyup', this._filterItem.bind(this, 'meal'))
        document.querySelector('.workout-filter')
        .addEventListener('keyup', this._filterItem.bind(this, 'workout'))

        document.querySelector('.reset-day')
        .addEventListener('click', this._reset.bind(this))
    }

    // take the type
    // on submite the function will check which form was submitet then
    // if the meal-form is submitet the type become "meal" then the function take the value and pass it where we call the type
    _addNewItem(type, e){
        e.preventDefault()

        const name = document.querySelector(`.${type}-name`)
        const calories = document.querySelector(`.${type}-calories`)

        if(name.value === "" || calories.value === ""){
            alert("Add meal name and calories")
            return
        }
        if(type === "meal"){
            const meal = new Meal(name.value, +calories.value)
    
            this._tracker.addMeal(meal)
        }else{
            const workout = new Workout(name.value, +calories.value)
            this._tracker.addWorkout(workout)
        }

        name.value = ""
        calories.value =""
    }
    // _addNewWorkout(e){
    //     e.preventDefault()

    //     const name = document.querySelector('.workout-name')
    //     const calories = document.querySelector('.workout-calories')

    //     if(name.value === "" || calories.value === ""){
    //         alert("Add workout name and calories")
    //         return
    //     }

    //     const workout = new Workout(name.value, +calories.value)

    //     this._tracker.addWorkout(workout)

    //     name.value = ""
    //     calories.value =""
    // }

    _removeItem(type, e){
        if(e.target.classList.contains('remove-meal')){
            // when we click on remove-meal btn the id = closest > card > id and the closest card will by the card where the button is in.
            const id = e.target.closest('.card').getAttribute('data-id')
            // if the type is meal ?(then) run removeMeal(pass the id we got from the closest card on btn click) :(Else) run removeWorkout(pass the id ......)
            // create this public function in tracker object and use them to remove the data from the app not only the card
            type === "meal"
             ? this._tracker.removeMeal(id)
             : this._tracker.removeWorkout(id)
            // remove the closest card from the button we click
             e.target.closest('.card').remove()
        }
    }
    _filterItem(type, e){
        const text = e.target.value.toLowerCase()
        document.querySelectorAll(`.${type}-div .card`).forEach(item => {
        const name = item.firstElementChild.textContent

        // if they dosen't match the result will be -1
        // if the result is !==(not equal) that check if name match with text bcs if they match then the result is not equal with -1.
        if(name.toLowerCase().indexOf(text) !== -1){
            item.style.display = 'block'
        }else{
            item.style.display = 'none'
        }
       })
        
    }
    _reset(){
        this._tracker.reset()
        document.querySelector('.meal-div').innerHTML = ''
        document.querySelector('.workout-div').innerHTML = ''
        document.querySelector('.meal-filter').value = ''
        document.querySelector('.workout-filter').value = ''
    }
}

const app = new App()