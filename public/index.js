import {column_arrangement, setDimension, createBoard, getNumberOfColumnField, checkInputField, postBoardCreation, boardRefresh, closeAsideBarMobile, clearAllInputFields} from './module.js'

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

    /* This code is adding a click event listener to an element with the class "asideReveakBtn". When that
    element is clicked, it performs the following actions: */
    const revealSideBarBtn = document.querySelector('.asideReveakBtn')
    revealSideBarBtn.addEventListener('click', () => {
    /* This code is removing the class "asidetoggleHidden" from the "aside" element, which makes it visible
    again. It also hides the element with the class "asideReveakBtn" by setting its display property to
    "none". Then, it sets the margin-left property of the element with the class "board_column" to the
    value of the dataset width of the "asideReveakBtn" element. This effectively moves the
    "board_column" element to the right, filling the space left by the hidden aside element. */
        document.querySelector('aside').classList.remove('asidetoggleHidden')
        document.querySelector('.asideReveakBtn').style.display = 'none'
        console.log(revealSideBarBtn.dataset.width)
        document.querySelector('.board_column').style.cssText =`margin-left: ${revealSideBarBtn.dataset.width}px`
    })



    // CONFIRMS IF KANBAN IS REGISTERED IN THE LOCAL STORAGE
    /* This code is checking if there is a value stored in the local storage with the key 'KANBAN'. */
    const getKanban = localStorage.getItem('KANBAN')
    if(getKanban){
        boardRefresh()
    }
    else{
        const stringKanbanDict = JSON.stringify(new Object)
        localStorage.setItem('KANBAN', stringKanbanDict)
        createBoard()
    }



    // CREATING A NEW BOARD.
    /* This code adds a click event listener to an element with the class "createNewBoard". When that
    element is clicked, it calls the `createBoard()` function. */
    document.querySelector('.createNewBoard').addEventListener('click', ()=> {
        document.querySelector('.boardCreationTitle').innerHTML = "Add New Board"
        document.querySelector('#createBoardColumnForm').style.display = 'block'
        createBoard()
        closeAsideBarMobile()
    })


    /* The above code is adding an event listener to the element with the class "closeBoardCreationForm".
    When this element is clicked, it will hide the elements with the classes "overLay" and "crudSection"
    by setting their display property to 'none'. */
    document.querySelector('.closeBoardCreationForm').addEventListener('click', () => {
        document.querySelector('.overLay').style.display = 'none'
        document.querySelector('.crudSection').style.display = 'none'
    })



    // ADDING NEW COLUMN INPUT FIELD WHEN CREATING A NEW BOARD.
    /* This code adds a click event listener to an element with the class "addColumn". When that element is
    clicked, it performs the following actions: */
    document.querySelector('.addColumn').addEventListener('click', (addColumnBtn)=> {
        /* This code is adding a new column input field to the page when a button is clicked. */
        addColumnBtn.preventDefault()
        const numberColumn = getNumberOfColumnField()

        const newColumn = document.createElement(`div`)
        newColumn.className = 'column_input_div dynamicField'
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
            clearAllInputFields()
        }

    })


    /* This code adds a click event listener to an element with the class "deleteBoard". When that element
    is clicked, it performs the following actions: */
    document.querySelector('.deleteBoard').addEventListener('click', () => {  
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        document.querySelector('.ConfirmDelete').style.display = 'block';
        document.querySelector('.overLay').style.display = 'flex';
        document.querySelector('.deleteWarningHeader').innerHTML = 'Delete this board?'
        document.querySelector('.deleteWarningText').innerHTML = `Are you sure you want to delete the '${activeBoard}' board? This action will remove all columns and tasks and cannot be reversed.`
    })

    /* The above code is adding an event listener to a button with the class "confirmBoardDelete". When the
    button is clicked, the code retrieves the kanban object from local storage, gets the name of the
    currently selected board, deletes the corresponding property from the kanban object, and then
    updates the local storage with the modified kanban object. After that, it calls the function
    "boardRefresh()" to update the UI. It also hides the article element that contains the delete board
    button, and hides the confirmation modal. */
    document.querySelector('.confirmBoardDelete').addEventListener('click', () => {
        const kanbanObj = JSON.parse(localStorage.getItem('KANBAN'))
        const activeBoard = document.querySelector('.selectedBoardStyles').dataset.name 
        delete kanbanObj[activeBoard]
        localStorage.setItem('KANBAN', JSON.stringify(kanbanObj))
        boardRefresh()
        // Close the article element that houses the delete board button
        const boardSetting = document.querySelector('article')
        boardSetting.classList.remove('block')
        boardSetting.classList.add('hidden')
        // close the confirmation modal
        document.querySelector('.overLay').style.display = 'none'
        document.querySelector('.ConfirmDelete').style.display = 'none';
    })

    /* The above code is adding an event listener to the element with the class "closeConfirmationModal".
    When this element is clicked, the code performs the following actions:
    1. It selects the element with the tag "article" and assigns it to the variable "boardSetting".
    2. It removes the class "block" from the "boardSetting" element.
    3. It adds the class "hidden" to the "boardSetting" element.
    4. It sets the display property of the element with the class "overLay" to "none".
    5. It sets the display property of the element */
    document.querySelector('.closeConfirmationModal').addEventListener('click', () => {
        const boardSetting = document.querySelector('article')
        boardSetting.classList.remove('block')
        boardSetting.classList.add('hidden')
        document.querySelector('.overLay').style.display = 'none'
        document.querySelector('.ConfirmDelete').style.display = 'none';
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

    


    /* This code is adding a click event listener to an element with the class "mobileNavBar". When that
    element is clicked, it toggles the visibility of the aside navigation bar. */
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

























