/**
 * The function `setDimension()` adjusts the height and width of various elements on the page based on
 * the window size and the dimensions of other elements.
 */
export function setDimension(){
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    /* This code is adjusting the height and margin of various elements on the page based on the window
    size and the dimensions of other elements. */
    const navHeaderHeight = document.querySelector('header').offsetHeight;
    document.querySelector('#main_container').style.cssText = `margin-top: ${navHeaderHeight}px; max-height: ${windowHeight - navHeaderHeight}px`
    if(windowWidth > 767){
        document.querySelector('aside').style.cssText = `height: ${windowHeight - navHeaderHeight}px`
    }
    // document.querySelector('article').style.cssText = `margin-top: ${navHeaderHeight}px;`

    // OPERATION 2: GETTING THE WIDTH OF THE SIDEBAR AND GIVING THE APPROPRIATE PADDING FOR ELEMENT BELOW IT
    /* This code is getting the width of the sidebar element using
    `document.querySelector('aside').offsetWidth` and storing it in the variable `sideBarWidth`. */
    const sideBarWidth = document.querySelector('aside').offsetWidth;
    if(windowWidth > 767){
        document.querySelector('.board_column').style.cssText =`margin-left: ${sideBarWidth}px; width: ${windowWidth - sideBarWidth}px`
    }
}



/**
 * The function adjusts the width of a container element based on the number of columns it contains.
 */
export function column_arrangement(){
    const coulumnsCount  = document.querySelectorAll('.column').length
    document.querySelector('.board_column').style.width = `${coulumnsCount * 340}px`
}



/**
 * The function "getNumberOfColumnField" returns the number of child elements in the element with the
 * class "column_input_container".
 * @returns the number of child elements in the element with the class "column_input_container".
 */
export function getNumberOfColumnField(){
    const numberOfColumn = document.querySelector('.column_input_container').childElementCount
    return numberOfColumn
}



/**
 * The function creates a board by displaying a special element and a createBoard element.
 */
export function createBoard(){
    document.querySelector('.overLay').style.display = 'flex'
    document.querySelector('.crudSection').style.display = 'block'
}


/**
 * The function checks if all input fields with a specific class name have a value.
 * @param classname - The `classname` parameter is a string that represents the class name of the input
 * fields you want to check.
 * @returns a boolean value indicating whether all input fields with the specified class name have a
 * value or not.
 */
export function checkInputField(classname){
    let boardColumninputFilelds = document.querySelectorAll(`.${classname}`)
    const allColumninputfields = Array.from(boardColumninputFilelds).every(input => input.value !== "")
    return allColumninputfields
}





/**
 * The `postBoardCreation` function creates and updates the Kanban board interface based on the data
 * stored in the `KANBAN` object in local storage.
 * @param nameOfBoard - The name of the board that is being created or selected.
 */
export function postBoardCreation(nameOfBoard){

    const KANBAN = JSON.parse(localStorage.getItem('KANBAN'))
    document.querySelector('.boardName').innerHTML = nameOfBoard

    const boards = Object.keys(KANBAN)
    // gets the number of boards from KANBAN object and adds it to the DOM
    document.querySelector('.boardCount').innerHTML = `(${boards.length})`

    /* The code `document.querySelector('.boardContainer').innerHTML = ""` is setting the inner HTML of the
    element with the class "boardContainer" to an empty string. This effectively clears the content of
    the element, removing any existing HTML elements and text inside it. */
    document.querySelector('.boardContainer').innerHTML = ""

    // this code clears the column board container
    document.querySelector('.boardColumnContainer').innerHTML = ""

    // Looping through the kanban board array to get individaul boards
    for(let boardName = 0; boardName < boards.length; boardName++){  

       /* The code block is creating a board element for each board in a Kanban system. It sets the
       necessary classes and appends child elements to the board element, such as a board name and
       columns with tasks. */
        const boardDiv = document.createElement('div')
        boardDiv.dataset.name = boards[boardName]
        boardDiv.classList.remove('selectedBoardStyles')
        if(nameOfBoard == boards[boardName]){
            boardDiv.classList.add('selectedBoardStyles')

            // getting the columns
            const columnBoard = KANBAN[boards[boardName]]
            const columns = Object.keys(columnBoard)

            // Creating the elements in each individual column
            for(let columnName = 0; columnName < columns.length; columnName++){

                /* This code block is creating a column element for each column in a specific Kanban board. It sets the
                necessary classes and appends child elements to the column element, such as a column title and a
                task container. */
                const columnDiv = document.createElement('div')
                columnDiv.classList.add('column')
                columnDiv.classList.add('flex-auto')

                const columnTitle = document.createElement('div') 
                columnTitle.classList.add('column_title')

                const columnTitleSpan = document.createElement('span')
                columnTitleSpan.classList.add('column_title_span')
                columnTitleSpan.style.background = randomHexCode()

                const columnTitleHtag = document.createElement('h3')
                columnTitleHtag.innerHTML = [columns[columnName]]

                columnTitle.append(columnTitleSpan)
                columnTitle.append(columnTitleHtag)



                columnDiv.append(columnTitle)
    

                const taskBoard = KANBAN[boards[boardName]][columns[columnName]]
                const tasks = Object.keys(taskBoard)

                const taskContainer = document.createElement('div')
                taskContainer.classList.add('task_container')

                for(let taskName = 0; taskName < tasks.length; taskName++){

            /* This code block is creating a task element for each task in a specific column of a Kanban board. */
                    const subTaskBoard = KANBAN[boards[boardName]][columns[columnName]][tasks[taskName]]

                    const numberOfSubTask = Object.keys(subTaskBoard)

                    const task = document.createElement('div')
                    task.classList.add('task')

                    const taskHtag = document.createElement('h1')
                    taskHtag.classList.add('task_htag')
                    taskHtag.innerHTML = tasks[taskName]

                    const taskPtag = document.createElement('p')
                    taskPtag.classList.add('task_ptag')
                    taskPtag.innerHTML = `${countTrue(subTaskBoard)} of ${numberOfSubTask.length} subtasks`

                    task.append(taskHtag)
                    task.append(taskPtag)
                    taskContainer.append(task)
                }


                if(taskContainer.innerHTML.length == 0){
                    taskContainer.classList.add('dottedBorder')
                }
                columnDiv.append(taskContainer)
                document.querySelector('.boardColumnContainer').append(columnDiv)
                column_arrangement()

            }


        }
        else{
            boardDiv.classList.add('boardStyles')
            // Adding an event listener to dynamically created elements.
            boardDiv.addEventListener('click', () => {
                postBoardCreation(boardDiv.dataset.name)
                closeAsideBarMobile()
            })
        }

        const boardItem = `<img src="./assets/icon-board.svg" alt=""> <h2>${ boards[boardName]}</h2>`
        boardDiv.innerHTML = boardItem

        document.querySelector('.boardContainer').append(boardDiv)

    }


}

/**
 * The function `countTrue` counts the number of `true` values in a given dictionary.
 * @param dict - The `dict` parameter is an object that contains key-value pairs. The keys are strings
 * and the values are boolean values.
 * @returns The function `countTrue` returns the count of `true` values in the input dictionary.
 */
function countTrue(dict){
    let count = 0
    for(const key in dict){
        if (dict[key] === true){
            count += 1
        }
    }
    return count
}



// Random hexadecimal code
/**
 * The function randomHexCode generates a random hexadecimal color code.
 * @returns a randomly generated hexadecimal color code in the format "#xxxxxx", where each x
 * represents a random digit or letter from 0 to f.
 */
function randomHexCode(){
    const numbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let result = ""
    for(let i = 0; i < 6; i++){
        let randomElement = Math.floor(Math.random() * numbs.length)
        const element = numbs[randomElement]
        result += element
    }

    return '#'+result
}


/**
 * The function `boardRefresh` retrieves the KANBAN data from local storage, extracts the board names,
 * and then calls a function to create the boards.
 */
export function boardRefresh(){
    const KANBAN = JSON.parse(localStorage.getItem('KANBAN'))
    const boards = Object.keys(KANBAN)[0]
    postBoardCreation(boards)
}


/**
 * The function `closeAsideBarMobile` toggles the visibility of a mobile navigation bar and hides an
 * aside navigation bar if the window width is less than or equal to 767 pixels.
 */
export function closeAsideBarMobile(){
    if(window.innerWidth <= 767){
        document.querySelector('.mobileNavBar').classList.toggle('-rotate-180')
        const asideNavBar = document.querySelector('aside')
        asideNavBar.classList.remove('mobile:block')
        asideNavBar.classList.add('mobile:hidden')
    }
}


/**
 * The function clears the value of all text input fields on a webpage.
 */
export function clearAllInputFields(){
    document.querySelectorAll("input[type = 'text']").forEach( (input)=> {
        input.value = ""
    })

    /* The code is selecting all elements with the class "dynamicField" using the
    `document.querySelectorAll()` method. It then iterates over each selected element using the
    `forEach()` method and removes each element from the DOM using the `remove()` method. This code is
    effectively clearing or deleting all elements with the class "dynamicField" from the webpage. */
    const dynamicFields = document.querySelectorAll('.dynamicField')
    dynamicFields.forEach( (dynamicField)=> {
        dynamicField.remove()
    })
}


/**
 * The function `boardDeletion()` deletes the active board from the `kanbanObj` object stored in the
 * browser's localStorage and refreshes the board.
 */
export function boardDeletion(){
    const kanbanObj = JSON.parse(localStorage.getItem('KANBAN'))
    const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
    delete kanbanObj[activeBoard]
    localStorage.setItem('KANBAN', JSON.stringify(kanbanObj))
    boardRefresh()
}