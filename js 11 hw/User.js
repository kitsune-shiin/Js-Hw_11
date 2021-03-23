class User {
    constructor(id, name, email, address, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
    edit(id, name, email, address, phone) {
        this.name = newName;
        this.email = newEmail;
        this.address = newAddress;
        this.phone = newPhone;
    }
    get() {
        return {id: this.id, name: this.name, email: this.email, address: this.address, phone: this.phone}
    }
}
class Contacts {
    constructor() {
        this.data = [];
        this.addUser = this.addUser.bind(this)
    }
    editUser(event, id) {
        event.preventDefault()
        const name = event.currentTarget[0].value
        const email = event.currentTarget[1].value
        const address = event.currentTarget[2].value
        const phone = event.currentTarget[3].value
        const user = this.data.find(item => item.id === id)
        user.name = name
        user.email = email
        user.address = address
        user.phone = phone
    }
    deleteUser(id) {
        this.data = this.data.filter(item => item.id !== id)
    }
    addUser(event) {
        event.preventDefault()
        const name = event.currentTarget[1].value
        const email = event.currentTarget[2].value
        const address = event.currentTarget[3].value
        const phone = event.currentTarget[4].value
        this.data.push(new User(this.data.length, name, email, address, phone))
    }
}

class ContactsApp extends Contacts {
    constructor() {
        super()
    }

    drawEditForm(id) {
        const curentUser = this.data.find(item => item.id === id)
        console.log(curentUser)
       document.getElementById(id).insertAdjacentHTML('beforeend', `
            <form id="editUser">
                <input type='text' placeholder="name" value='${curentUser.name}'>
                <input type='text' placeholder="email" value='${curentUser.email}'>
                <input type='text' placeholder="address" value='${curentUser.address}'>
                <input type='text' placeholder="phone" value='${curentUser.phone}'>
                <button> Сохранить </button>
            </form>
       `)
       document.getElementById('editUser').addEventListener('submit', (event) => {this.editUser(event, id); this.drawUsers()})
        // this.editUser(element.id, this.drawUsers)
    }

    drawUsers() {
        document.body.querySelector('section') && document.body.querySelector('section').remove()
        const dataContainer = document.createElement('section')
        this.data.forEach(element => {
            //delete
            const btnDelete = document.createElement('button')
            btnDelete.innerHTML = 'Удалить'
            btnDelete.addEventListener('click', () => {this.deleteUser(element.id);this.drawUsers()})
            //edit
            const btnEdit = document.createElement('button')
            btnEdit.innerHTML = 'Редактировать'
            btnEdit.addEventListener('click', () => this.drawEditForm(element.id))
            dataContainer.insertAdjacentHTML('beforeend', `
            <div id='${element.id}'>
                <span>Name: ${element.name} </span>
                <span>Email: ${element.email} </span>
                <span>Address: ${element.address} </span>
                <span>Phone: ${element.phone} </span>
            </div>  
        `)
        dataContainer.appendChild(btnDelete)
        dataContainer.appendChild(btnEdit)
        });
        document.body.appendChild(dataContainer)
    }
    init() {
        document.body.insertAdjacentHTML('afterbegin', `
            <form id="addContact">
            <h1>Добавить контакт</h1>
            <input type="text" name="id-create" placeholder="id" autofocus>
            <input type="text" name="name-create" placeholder="name" autofocus>
            <input type="email" name="email-create" placeholder="email" autofocus>
            <input type="text" name="address-create" placeholder="address" autofocus>
            <input type="text" name="phone-create" placeholder="phone" autofocus>
            <button class="create-btn">Добавить</button>
            </form>
        `)
        document.getElementById('addContact').addEventListener('submit', (event) => {this.addUser(event); this.drawUsers()})
    }
}

const contactsBook = new ContactsApp()
contactsBook.init()