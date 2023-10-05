import {column_arrangement, setDimension, createBoard, getNumberOfColumnField, checkInputField, postBoardCreation, boardRefresh, closeAsideBarMobile} from './module.js'

document.addEventListener('DOMContentLoaded', () => {



    /* The code is calling two functions, `setDimension()` and `column_arrangement()`. */
    setDimension()
    column_arrangement()
    

    /* This code adds a click event listener to an element with the class "asideVisibility". When that
    element is clicked, it adds the class "asidetoggleHidden" to the "aside" element, which will hide it
    from view. It also sets the margin-left and padding-left properties of the ".board_column" element
    to 0px, effectively moving it to the left to fill the space left by the hidden aside element. */
    document.querySelector('.asideVisibility').addEventListener('click', () => {
        document.querySelector('aside').classList.add('asidetoggleHidden')
        document.querySelector('.board_column').style.cssText =`margin-left: 0px;`
        document.querySelector('.asideReveakBtn').style.display = 'flex'
        column_arrangement()
        document.querySelector('.asideReveakBtn').dataset.width = document.querySelector('aside').offsetWidth

    })

    const revealSideBarBtn = document.querySelector('.asideReveakBtn')
    revealSideBarBtn.addEventListener('click', () => {
        document.querySelector('aside').classList.remove('asidetoggleHidden')
        document.querySelector('.asideReveakBtn').style.display = 'none'
        console.log(revealSideBarBtn.dataset.width)
        document.querySelector('.board_column').style.cssText =`margin-left: ${revealSideBarBtn.dataset.width}px`
    })



    // CONFIRMS IF KANBAN IS REGISTERED IN THE LOCAL STORAGE
    const getKanban = localStorage.getItem('KANBAN')
    if(getKanban){
        boardRefresh()
    }
    else{
        const stringKanbanDict = JSON.stringify(new Object)
        localStorage.setItem('KANBAN', stringKanbanDict)
        createBoard()
    }



    // ADDING NEW COLUMN INPUT FIELD WHEN CREATING A NEW BOARD.
    /* This code adds a click event listener to an element with the class "addColumn". When that element is
    clicked, it performs the following actions: */
    document.querySelector('.addColumn').addEventListener('click', (addColumnBtn)=> {
        /* This code is adding a new column input field to the page when a button is clicked. */
        addColumnBtn.preventDefault()
        const numberColumn = getNumberOfColumnField()

        const newColumn = document.createElement(`div`)
        newColumn.className = 'column_input_div'
        newColumn.innerHTML = `<input class="boardInput border-line  boardInputColumn" type="text">`

/* This code is checking if the number of column input fields is equal to 5. If it is, it calls the
`addColumn()` function to add a new column input field and then hides the "Add Column" button by
setting its display property to "none". If the number of column input fields is not equal to 5, it
simply calls the `addColumn()` function to add a new column input field without hiding the "Add
Column" button. */
        if(numberColumn + 1 === 6){
            addColumn()
            addColumnBtn.target.style.display = 'none'
        }
        else{
            addColumn()
        }



        /**
         * The function adds a new column to a container and adds a delete button to each column, this function adds a delete button to each column input div if it has less than 2 child elements.
         */
        function addColumn(){
            document.querySelector('.column_input_container').append(newColumn)
            const closeBtn = `<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>`
            document.querySelectorAll('.column_input_div').forEach( (column_input_div) => {
                const columnInputDivCount = column_input_div.childElementCount
                if(columnInputDivCount < 2){
                    const closeBtnDiv = document.createElement('div')
                    closeBtnDiv.classList.add('closeColumnField')
                    closeBtnDiv.classList.add('cursor-pointer')
                    closeBtnDiv.innerHTML = closeBtn
                    closeBtnDiv.style.display = 'block'
                    closeBtnDiv.addEventListener('click', () => {

                        const parentContainer = closeBtnDiv.parentNode
                        parentContainer.remove()
                        if (getNumberOfColumnField() < 6){
                            document.querySelector('.addColumn').style.display = 'block'
                        }

                        if(getNumberOfColumnField() == 1){
                            document.querySelector('.closeColumnField').remove()
                        }

                    })
                    column_input_div.append(closeBtnDiv)
                }
            })
        }


    })


    

/* This code is adding a click event listener to an element with the class "saveBoard". When that
element is clicked, it performs the following actions: */
    document.querySelector('.saveBoard').addEventListener('click', (saveBoard) => {
        saveBoard.preventDefault()


        const boardName = document.querySelector('.boardInputName').value 
        const allBoardColumns = document.querySelectorAll('.boardInputColumn')

        // changes each input border color if it is empty or not
/* The code is iterating over each element with the class "boardInputColumn" and checking if its value
length is equal to 0. If the value length is 0, it removes the class "border-line" and adds the
class "border-red-500" to the element. If the value length is not 0, it adds the class "border-line"
and removes the class "border-red-500" from the element. This code is essentially changing the
border color of the input fields based on whether they are empty or not. */
        allBoardColumns.forEach( (boardInputColumn) => {
            if(boardInputColumn.value.length === 0){
                boardInputColumn.classList.remove('border-line')
                boardInputColumn.classList.add('border-red-500')
            }
            else{
                boardInputColumn.classList.add('border-line')
                boardInputColumn.classList.remove('border-red-500')
            }
        })


        // checks if all the input are empty ==> false or not == >True 
/* This code block is checking if all the input fields with the class "boardInputColumn" have been
filled out. If all the input fields have been filled out, it performs the following actions: */
        if (checkInputField('boardInputColumn')) {
            // GETTING THE BOARD NAME AND COLUMNS AND SAVING THEM.
            const KANBAN = JSON.parse(localStorage.getItem('KANBAN'))
            // Setting the Board Name
            KANBAN[boardName] = {}
            // Setting the columns
            allBoardColumns.forEach( (allBoardColumn)=> {
                const columnName = allBoardColumn.value
                KANBAN[boardName][columnName] = {}
            })

            let updateKanban = JSON.stringify(KANBAN)
            localStorage.setItem('KANBAN',updateKanban )

            document.querySelector('.overLay').style.display = 'none'

            postBoardCreation(boardName)
    
        }

    })


    // creating a new board.
/* This code adds a click event listener to an element with the class "createNewBoard". When that
element is clicked, it calls the `createBoard()` function. */
    document.querySelector('.createNewBoard').addEventListener('click', ()=> {
        createBoard()
        closeAsideBarMobile()
    })


/* This code adds a click event listener to an element with the class "boardSettingBtn". When that
element is clicked, it toggles the visibility of an element with the tag name "article". */
    document.querySelector('.boardSettingBtn').addEventListener('click', () => {
        const boardSetting = document.querySelector('article')
        if(boardSetting.classList.contains('hidden')){
            boardSetting.classList.remove('hidden')
            boardSetting.classList.add('block')
        }
        else{
            boardSetting.classList.remove('block')
            boardSetting.classList.add('hidden')
        }
    })

    
/* This code adds a click event listener to an element with the class "deleteBoard". When that element
is clicked, it performs the following actions: */
    document.querySelector('.deleteBoard').addEventListener('click', () => {
        const kanbanObj = JSON.parse(localStorage.getItem('KANBAN'))
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        delete kanbanObj[activeBoard]
        localStorage.setItem('KANBAN', JSON.stringify(kanbanObj))
        boardRefresh()
    })


    const mobileNavbarBtn = document.querySelector('.mobileNavBar')
    mobileNavbarBtn.addEventListener('click', (mobileBar) => {
        mobileNavbarBtn.classList.toggle('-rotate-180')
        const asideNavBar = document.querySelector('aside')
        if(asideNavBar.classList.contains('mobile:hidden')){
            asideNavBar.classList.remove('mobile:hidden')
            asideNavBar.classList.add('mobile:block')
        }
        else{
            asideNavBar.classList.remove('mobile:block')
            asideNavBar.classList.add('mobile:hidden')
        }
    })












})

























