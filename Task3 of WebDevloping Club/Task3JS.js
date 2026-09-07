// =========================
// DATA
// =========================

let userName = localStorage.getItem("userName") || "";

let members =
    JSON.parse(localStorage.getItem("members")) || [];

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

let groupName =
    localStorage.getItem("groupName") || "";


// =========================
// GET HTML ELEMENTS
// =========================

const userInitial =
    document.getElementById("userInitial");

const userNameDisplay =
    document.getElementById("userName");

const nameInput =
    document.getElementById("nameInput");

const startBtn =
    document.getElementById("startBtn");

const groupList =
    document.getElementById("groupList");

const currentGroupName =
    document.getElementById("currentGroupName");

const memberList =
    document.getElementById("memberList");

const mainMember =
    document.getElementById("mainMember");

const expenseList =
    document.getElementById("expenseList");

const settlementList =
    document.getElementById("settlementList");


// =========================
// USER NAME
// =========================

function updateUser() {

    if (userName !== "") {

        userNameDisplay.textContent = userName;

        userInitial.textContent =
            userName.charAt(0).toUpperCase();

        nameInput.value = userName;
    }
}


startBtn.addEventListener("click", function () {

    const name = nameInput.value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;
    }

    userName = name;

    localStorage.setItem("userName", userName);

    userNameDisplay.textContent = userName;

    userInitial.textContent =
        userName.charAt(0).toUpperCase();


    if (!members.includes(userName)) {

        members.unshift(userName);

        saveMembers();
    }

    displayMembers();
});


// =========================
// MEMBERS
// =========================

function saveMembers() {

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );
}


function displayMembers() {

    memberList.innerHTML = "";

    mainMember.innerHTML = "";


    if (members.length === 0) {

        memberList.innerHTML =
            '<p class="empty-text">No members yet.</p>';

        mainMember.innerHTML =
            '<p class="empty-text">No members yet.</p>';

        return;
    }


    members.forEach(function (member) {

        // Sidebar member
        const sidebarMember =
            document.createElement("div");

        sidebarMember.className = "member-item";

        sidebarMember.textContent =
            "👤 " + member;

        memberList.appendChild(sidebarMember);


        // Main member
        const mainMemberItem =
            document.createElement("div");

        mainMemberItem.className = "member-item";

        mainMemberItem.textContent =
            "👤 " + member;

        mainMember.appendChild(mainMemberItem);

    });
}


// =========================
// GROUP
// =========================

const addGroupBtn =
    document.getElementById("addGroupBtn");

const createGroupBtn =
    document.getElementById("createGroupBtn");

const groupModal =
    document.getElementById("groupModal");

const groupNameInput =
    document.getElementById("groupNameInput");

const cancelGroupBtn =
    document.getElementById("cancelGroupBtn");

const saveGroupBtn =
    document.getElementById("saveGroupBtn");


addGroupBtn.addEventListener("click", openGroupModal);

createGroupBtn.addEventListener("click", openGroupModal);


function openGroupModal() {

    groupModal.style.display = "flex";
}


cancelGroupBtn.addEventListener("click", function () {

    groupModal.style.display = "none";

});


saveGroupBtn.addEventListener("click", function () {

    const name =
        groupNameInput.value.trim();


    if (name === "") {

        alert("Please enter a group name.");

        return;
    }


    groupName = name;

    localStorage.setItem(
        "groupName",
        groupName
    );


    displayGroup();

    groupNameInput.value = "";

    groupModal.style.display = "none";

});


function displayGroup() {

    if (groupName !== "") {

        groupList.innerHTML =
            "<p>" + groupName + "</p>";

        currentGroupName.textContent =
            groupName;

    } else {

        groupList.innerHTML =
            '<p class="empty-text">No groups yet.</p>';

        currentGroupName.textContent =
            "No group selected";
    }
}


// =========================
// ADD MEMBER
// =========================

const addMemberBtn =
    document.getElementById("addMemberBtn");

const memberModal =
    document.getElementById("memberModal");

const memberNameInput =
    document.getElementById("memberNameInput");

const cancelMemberBtn =
    document.getElementById("cancelMemberBtn");

const saveMemberBtn =
    document.getElementById("saveMemberBtn");


addMemberBtn.addEventListener("click", function () {

    memberModal.style.display = "flex";

});


cancelMemberBtn.addEventListener("click", function () {

    memberModal.style.display = "none";

});


saveMemberBtn.addEventListener("click", function () {

    const name =
        memberNameInput.value.trim();


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

    memberNameInput.value = "";

    memberModal.style.display = "none";

});


// =========================
// ADD EXPENSE
// =========================

const addExpenseBtn =
    document.getElementById("addExpenseBtn");

const expenseModal =
    document.getElementById("expenseModal");

const cancelExpenseBtn =
    document.getElementById("cancelExpenseBtn");

const saveExpenseBtn =
    document.getElementById("saveExpenseBtn");

const expenseDescription =
    document.getElementById("expenseDescription");

const expenseAmount =
    document.getElementById("expenseAmount");

const paidBy =
    document.getElementById("paidBy");

const splitMembers =
    document.getElementById("splitMembers");

const sharePreview =
    document.getElementById("sharePreview");


addExpenseBtn.addEventListener("click", function () {

    if (members.length === 0) {

        alert("Please add members first.");

        return;
    }

    openExpenseModal();

});


cancelExpenseBtn.addEventListener("click", function () {

    expenseModal.style.display = "none";

});


function openExpenseModal() {

    paidBy.innerHTML = "";

    splitMembers.innerHTML = "";


    members.forEach(function (member) {

        // Paid by dropdown
        const option =
            document.createElement("option");

        option.value = member;

        option.textContent = member;

        paidBy.appendChild(option);


        // Split checkbox
        const label =
            document.createElement("label");

        label.className = "split-option";


        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.value = member;

        checkbox.checked = true;


        checkbox.addEventListener(
            "change",
            calculateShare
        );


        label.appendChild(checkbox);

        label.appendChild(
            document.createTextNode(" " + member)
        );


        splitMembers.appendChild(label);

    });


    expenseModal.style.display = "flex";

    calculateShare();
}


// =========================
// EQUAL SHARE
// =========================

expenseAmount.addEventListener(
    "input",
    calculateShare
);


function calculateShare() {

    const amount =
        Number(expenseAmount.value) || 0;


    const selected =
        splitMembers.querySelectorAll(
            "input[type='checkbox']:checked"
        );


    if (selected.length === 0) {

        sharePreview.textContent =
            "Equal share: ₹0";

        return;
    }


    const share =
        amount / selected.length;


    sharePreview.textContent =
        "Equal share: ₹" +
        share.toFixed(2);
}


// =========================
// SAVE EXPENSE
// =========================

saveExpenseBtn.addEventListener("click", function () {

    const description =
        expenseDescription.value.trim();


    const amount =
        Number(expenseAmount.value);


    const payer =
        paidBy.value;


    const selectedMembers =
        Array.from(
            splitMembers.querySelectorAll(
                "input[type='checkbox']:checked"
            )
        ).map(function (checkbox) {

            return checkbox.value;

        });


    if (description === "") {

        alert("Please enter a description.");

        return;
    }


    if (amount <= 0) {

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

        payer: payer,

        members: selectedMembers

    };


    expenses.push(expense);


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();

    calculateBalances();


    expenseDescription.value = "";

    expenseAmount.value = "";

    expenseModal.style.display = "none";

});


// =========================
// DISPLAY EXPENSES
// =========================

function displayExpenses() {

    expenseList.innerHTML = "";


    if (expenses.length === 0) {

        expenseList.innerHTML =
            '<p class="empty-text">No expenses yet.</p>';

        return;
    }


    expenses.forEach(function (expense) {

        const item =
            document.createElement("div");

        item.className = "expense-item";


        const share =
            expense.amount /
            expense.members.length;


        item.innerHTML =
            "<strong>" +
            expense.description +
            "</strong><br>" +

            "₹" +
            expense.amount.toFixed(2) +

            " paid by " +
            expense.payer +

            "<br>Each share: ₹" +
            share.toFixed(2);


        expenseList.appendChild(item);

    });
}


// =========================
// SETTLEMENT
// =========================

const settleBtn =
    document.getElementById("settleBtn");

const settlementSection =
    document.getElementById("settlementSection");


settleBtn.addEventListener("click", function () {

    settlementSection.scrollIntoView({
        behavior: "smooth"
    });

});


function calculateBalances() {

    const balances = {};


    members.forEach(function (member) {

        balances[member] = 0;

    });


    expenses.forEach(function (expense) {

        const share =
            expense.amount /
            expense.members.length;


        balances[expense.payer] +=
            expense.amount;


        expense.members.forEach(function (member) {

            balances[member] -= share;

        });

    });


    displaySettlement(balances);

}


// =========================
// SHOW SETTLEMENT
// =========================

function displaySettlement(balances) {

    settlementList.innerHTML = "";


    const creditors = [];

    const debtors = [];


    Object.keys(balances).forEach(function (member) {

        const balance =
            Math.round(
                balances[member] * 100
            ) / 100;


        if (balance > 0.01) {

            creditors.push({
                name: member,
                amount: balance
            });

        }


        if (balance < -0.01) {

            debtors.push({
                name: member,
                amount: -balance
            });

        }

    });


    if (
        creditors.length === 0 &&
        debtors.length === 0
    ) {

        settlementList.innerHTML =
            '<p class="empty-text">No settlement needed.</p>';

        return;
    }


    let i = 0;

    let j = 0;


    while (
        i < debtors.length &&
        j < creditors.length
    ) {

        const amount =
            Math.min(
                debtors[i].amount,
                creditors[j].amount
            );


        const item =
            document.createElement("div");

        item.className =
            "settlement-item";


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


// =========================
// LOAD SAVED DATA
// =========================

updateUser();

displayMembers();

displayGroup();

displayExpenses();

calculateBalances();
