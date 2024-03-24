document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("primary-form")
    const filterBtn = document.querySelector('.filter-btn');
    const filterInputs = document.querySelectorAll('.filter-input')
    const ul = document.querySelector('.result')
    const filters = {};

    filterBtn.addEventListener('click', () => {
        filterInputs.forEach((filter) => {
            filters[filter.name] = filter.value;
        })
        let data = JSON.parse(getItem());
        filter(data, filters, ul);
    })

    onSubmit(form)
})

const setItem = (value) => {
    localStorage.setItem('formValue', JSON.stringify(value))
}

const getItem = () => {
    return localStorage.getItem('formValue');
}

const onSubmit = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const formObject = Object.fromEntries(data.entries());
        if (getItem() == null) {
            setItem([formObject]);
        } else {
            const array = JSON.parse(getItem());
            array.push(formObject);
            setItem(array);
        }
    })
}

function filter(data, filters, ul) {
    if(!data) alert('No data to filter');
    data = data.filter((submission) => {
        let match = false;
        const keys = Object.keys(filters);
        keys.every(key => {
            if(filters[key] != '' && submission[key] != filters[key]){ 
                match = false;
                return false
            } else {
                match = true;
                return true;
            }
        });
        return match;
    })
    ul.innerHTML = '';
    data.forEach(element => {
        let li = document.createElement('li');
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const span = document.createElement('span');
                span.textContent = `${key}: ${element[key]}`;
                li.appendChild(span);
                li.appendChild(document.createElement('br'));
            }
        }
    
        ul.appendChild(li);
    });
}

