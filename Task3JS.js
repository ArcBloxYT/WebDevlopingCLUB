// ===============================
// GROUP EXPENSE SPLITTER
// ===============================

// Get elements from HTML
const userInitial = document.getElementById("userInitial");
const userName = document.getElementById("userName");
const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");

const addGroupBtn = document.getElementById("addGroupBtn");
const createGroupBtn = document.getElementById("createGroupBtn");

const groupModal = document.getElementById("groupModal");
const groupNameInput = document.getElementById("groupNameInput");
const cancelGroupBtn = document.getElementById("cancelGroupBtn");
const saveGroupBtn = document.getElementById("saveGroupBtn");

const memberModal = document.getElementById("memberModal");
const memberNameInput = document.getElementById("memberNameInput");
const addMemberBtn = document.getElementById("addMemberBtn");
const cancelMemberBtn = document.getElementById("cancelMemberBtn");
const saveMemberBtn = document.getElementById("saveMemberBtn");

const expenseModal = document.getElementById("expenseModal");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const cancelExpenseBtn = document.getElementById("cancelExpenseBtn");
const saveExpenseBtn = document.getElementById("saveExpenseBtn");

const expenseDescription = document.getElementById("expenseDescription");
const expenseAmount = document.getElementById("expenseAmount");
const paidBy = document.getElementById("paidBy");
const splitMembers = document.getElementById("splitMembers");
const sharePreview = document.getElementById("sharePreview");

const groupList = document.getElementById("groupList");
const memberList = document.getElementById("memberList");
const mainMember = document.getElementById("mainMember");

const currentGroupName = document.getElementById("currentGroupName");
const expenseList = document.getElementById("expenseList");

const settleBtn = document.getElementById("settleBtn");
const settlementSection = document.getElementById("settlementSection");
const settlementList = document.getElementById("settlementList");


// ===============================
// DATA
// ===============================

let members = JSON.parse(localStorage.getItem("members")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let groupName = localStorage.getItem("groupName") || "";
let savedName = localStorage.getItem("userName") || "";


// ===============================
// USER NAME
// ===============================

function updateUser(name) {

    userName.textContent = name;

    if (name) {
        userInitial.textContent = name.charAt(0).toUpperCase();
    } else {
        userInitial.textContent = "?";
    }
}


if (savedName) {

    updateUser(savedName);
    nameInput.value = savedName;

    document.getElementById("welcomeSection").style.display = "none";
}


// Start button
startBtn.addEventListener("click", function () {

    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("userName", name);

    updateUser(name);

    document.getElementById("welcomeSection").style.display = "none";

    if (!members.includes(name)) {
        members.unshift(name);
        saveMembers();
    }

    displayMembers();
    updateExpensePeople();

});


// ===============================
// LOCAL STORAGE
// ===============================

function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members));
}


function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


// ===============================
// GROUP
// ===============================

function openGroupModal() {
    groupModal.style.display = "flex";
}


function closeGroupModal() {
    groupModal.style.display = "none";
}


addGroupBtn.addEventListener("click", openGroupModal);

createGroupBtn.addEventListener("click", openGroupModal);


cancelGroupBtn.addEventListener("click", closeGroupModal);


// Create group
saveGroupBtn.addEventListener("click", function () {

    const name = groupNameInput.value.trim();

    if (name === "") {
        alert("Please enter a group name.");
        return;
    }

    groupName = name;

    localStorage.setItem("groupName", groupName);

    currentGroupName.textContent = groupName;

    groupList.innerHTML = `
        <div class="menu-item">
            ${groupName}
        </div>
    `;

    groupNameInput.value = "";

    closeGroupModal();

});


// Load group
if (groupName) {
    currentGroupName.textContent = groupName;

    groupList.innerHTML = `
        <div class="menu-item">
            ${groupName}
        </div>
    `;
}


// ===============================
// MEMBERS
// ===============================

function displayMembers() {

    if (members.length === 0) {

        memberList.innerHTML = `
            <p class="empty-text">
                No members yet.
            </p>
        `;

        mainMember.innerHTML = `
            <p class="empty-text">
                No members yet.
            </p>
        `;

        return;
    }


    memberList.innerHTML = "";

    mainMember.innerHTML = "";


    members.forEach(function (member) {

        const sidebarMember = document.createElement("div");

        sidebarMember.className = "menu-item";

        sidebarMember.textContent = "👤 " + member;

        memberList.appendChild(sidebarMember);


        const mainMemberItem = document.createElement("div");

        mainMemberItem.className = "member-item";

        mainMemberItem.textContent = "👤 " + member;

        mainMember.appendChild(mainMemberItem);

    });

}


addMemberBtn.addEventListener("click", function () {

    memberModal.style.display = "flex";

});


cancelMemberBtn.addEventListener("click", function () {

    memberModal.style.display = "none";

});


saveMemberBtn.addEventListener("click", function () {

    const name = memberNameInput.value.trim();

    if (name === "") {
        alert("Please enter a member name.");
        return;
    }


    if (members.includes(name)) {
        alert("This member already exists.");
        return;
    }


    members.push(name);

    saveMembers();

    displayMembers();

    updateExpensePeople();

    memberNameInput.value = "";

    memberModal.style.display = "none";

});


// ===============================
// EXPENSE
// ===============================

addExpenseBtn.addEventListener("click", function () {

    if (members.length < 2) {

        alert("Add at least 2 members first.");

        return;
    }

    updateExpensePeople();

    expenseModal.style.display = "flex";

});


cancelExpenseBtn.addEventListener("click", function () {

    expenseModal.style.display = "none";

});


function updateExpensePeople() {

    paidBy.innerHTML = "";

    splitMembers.innerHTML = "";


    members.forEach(function (member) {

        const option = document.createElement("option");

        option.value = member;

        option.textContent = member;

        paidBy.appendChild(option);


        const label = document.createElement("label");

        label.className = "split-option";


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.value = member;

        checkbox.checked = true;

        checkbox.addEventListener("change", calculateShare);


        label.appendChild(checkbox);

        label.appendChild(
            document.createTextNode(" " + member)
        );

        splitMembers.appendChild(label);

    });


    calculateShare();

}


// ===============================
// EQUAL SHARE
// ===============================

function calculateShare() {

    const amount = parseFloat(expenseAmount.value) || 0;

    const selectedMembers =
        splitMembers.querySelectorAll("input:checked");


    if (selectedMembers.length === 0) {

        sharePreview.textContent = "Equal share: ₹0";

        return;
    }


    const share = amount / selectedMembers.length;


    sharePreview.textContent =
        "Equal share: ₹" + share.toFixed(2);

}


expenseAmount.addEventListener("input", calculateShare);


// ===============================
// SAVE EXPENSE
// ===============================

saveExpenseBtn.addEventListener("click", function () {

    const description =
        expenseDescription.value.trim();

    const amount =
        parseFloat(expenseAmount.value);

    const payer =
        paidBy.value;


    const selectedMembers =
        Array.from(
            splitMembers.querySelectorAll("input:checked")
        ).map(function (checkbox) {
            return checkbox.value;
        });


    if (description === "") {

        alert("Please enter an expense description.");

        return;
    }


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;
    }


    if (selectedMembers.length === 0) {

        alert("Select at least one member.");

        return;
    }


    const expense = {

        description: description,

        amount: amount,

        paidBy: payer,

        splitBetween: selectedMembers

    };


    expenses.push(expense);

    saveExpenses();

    displayExpenses();

    calculateSettlement();


    expenseDescription.value = "";

    expenseAmount.value = "";

    sharePreview.textContent =
        "Equal share: ₹0";

    expenseModal.style.display = "none";

});


// ===============================
// DISPLAY EXPENSES
// ===============================

function displayExpenses() {

    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <p class="empty-text">
                No expenses yet.
            </p>
        `;

        return;
    }


    expenseList.innerHTML = "";


    expenses.forEach(function (expense) {

        const item = document.createElement("div");

        item.className = "expense-item";


        item.innerHTML = `
            <div>
                <strong>${expense.description}</strong>
                <p>Paid by ${expense.paidBy}</p>
            </div>

            <strong>
                ₹${expense.amount.toFixed(2)}
            </strong>
        `;


        expenseList.appendChild(item);

    });

}


// ===============================
// SETTLEMENT CALCULATION
// ===============================

function calculateSettlement() {

    if (members.length === 0 || expenses.length === 0) {

        settlementList.innerHTML = `
            <p class="empty-text">
                No settlement needed.
            </p>
        `;

        return;
    }


    const balances = {};


    members.forEach(function (member) {

        balances[member] = 0;

    });


    expenses.forEach(function (expense) {

        const share =
            expense.amount / expense.splitBetween.length;


        balances[expense.paidBy] += expense.amount;


        expense.splitBetween.forEach(function (member) {

            balances[member] -= share;

        });

    });


    const creditors = [];

    const debtors = [];


    members.forEach(function (member) {

        const balance = balances[member];


        if (balance > 0.01) {

            creditors.push({
                name: member,
                amount: balance
            });

        }


        if (balance < -0.01) {

            debtors.push({
                name: member,
                amount: Math.abs(balance)
            });

        }

    });


    settlementList.innerHTML = "";


    if (debtors.length === 0 || creditors.length === 0) {

        settlementList.innerHTML = `
            <p class="empty-text">
                No settlement needed.
            </p>
        `;

        return;
    }


    let i = 0;
    let j = 0;


    while (i < debtors.length && j < creditors.length) {

        const amount =
            Math.min(
                debtors[i].amount,
                creditors[j].amount
            );


        const item =
            document.createElement("div");


        item.className = "settlement-item";


        item.textContent =
            debtors[i].name +
            " pays ₹" +
            amount.toFixed(2) +
            " to " +
            creditors[j].name;


        settlementList.appendChild(item);


        debtors[i].amount -= amount;

        creditors[j].amount -= amount;


        if (debtors[i].amount < 0.01) {
            i++;
        }


        if (creditors[j].amount < 0.01) {
            j++;
        }

    }

}


// ===============================
// SETTLE UP BUTTON
// ===============================

settleBtn.addEventListener("click", function () {

    calculateSettlement();

    settlementSection.scrollIntoView({
        behavior: "smooth"
    });

});


// ===============================
// LOAD SAVED DATA
// ===============================

displayMembers();

displayExpenses();

calculateSettlement();

updateExpensePeople();