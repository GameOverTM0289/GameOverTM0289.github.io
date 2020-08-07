
// BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
            /*
            0
            [200, 300, 100]
            sum = 0 + 200
            sum = 200 + 300
            sum = 500 + 100 
            sum = 600
            */
           data.totals[type] = sum;
        });
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc:0
        }, 
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // [ 1 2 3 4 5], next ID = 6
            // [1 2 4 7 8], next ID = 9
            // ID - last ID + 1 

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') [
                newItem = new Income(ID, des, val)
            ]
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            // Return the new element
            return newItem;
        },

        calculateBudget: function() {

            // Calculate the income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100);
                // Expense = 100 and Income = 300, spent 33.333 = 100/300 = 0.333 * 100
            } else {
                data.percentage = -1;
            }
            
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function () {
            console.log(data)
        }
    };

})();


//  UI Controller
var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }

    return {
        getInput: function() {
            return {
            type: document.querySelector(DOMStrings.inputType).value, // Will be either inc(+) or exp(-)
            description: document.querySelector(DOMStrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML String with placeholdertext

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder textwith some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); // beforeend adds element child at the end, pushes  childs.
        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;
            

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = "---";
            }

        },

        getDOMstrings: function() {
            return DOMStrings;
        }
    };

})();


// Global APP Controller
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
            var DOM = UICtrl.getDOMstrings();

            document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

            document.addEventListener('keypress', function(event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };


    var updateBudget = function() {
        // 1.  Calculate the budget
        budgetCtrl.calculateBudget();

        // 2.  Return the budget
        var budget =  budgetCtrl.getBudget();

        // 3.  Display the budget on the UI
        UICtrl.displayBudget(budget);
    };


    var ctrlAddItem = function() {
        var input, newItem;
        // 1.  Get the field input data
        input = UICtrl.getInput();


        if (input.description !== " " && input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            // 2.  Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // 3.  Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 3.1  Clear Fields
        UICtrl.clearFields();

        // 4 Calculate and update budget
        updateBudget();
        }

    };

    ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];

            // 1. Delete the item from the data structue

            // 2. Delete the item from UI

            // 3. Update and show the new budget
        }
    };

    return {
        init: function() {
            console.log("Application has been started successfully !")
            UICtrl.displayBudget({
                budget: "-No Budget-",
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            
            return setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();