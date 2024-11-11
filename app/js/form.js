document.addEventListener('DOMContentLoaded', function () {
    const callbackBtn = document.getElementById('callback-btn')
    const callbackForm = document.querySelector('.main__callback')
    const exitBtn = document.querySelector('.main__exit-cb')
    const submitBtn = document.querySelector('.main__send-cb')
    const phoneInput = document.querySelector('#phone')
    const phoneMask = '+7 (___) ___-__-__'

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeForm()
        }
    })

    function closeForm() {
        callbackForm.classList.remove('active')
        document.body.classList.remove('modal-open')
    }

    function initPhoneMask(input) {
        let currentValue = ''

        function updatePhoneValue() {
            let maskedValue = phoneMask
            let valueIndex = 0

            for (let i = 0; i < maskedValue.length; i++) {
                if (
                    maskedValue[i] === '_' &&
                    valueIndex < currentValue.length
                ) {
                    maskedValue =
                        maskedValue.slice(0, i) +
                        currentValue[valueIndex] +
                        maskedValue.slice(i + 1)
                    valueIndex++
                }
            }

            const cursorPos = maskedValue.indexOf('_')

            input.value = maskedValue

            if (cursorPos !== -1) {
                input.setSelectionRange(cursorPos, cursorPos)
            } else {
                input.setSelectionRange(maskedValue.length, maskedValue.length)
            }
        }

        function maskPhone(event) {
            if (event.inputType === 'deleteContentBackward') {
                if (currentValue.length > 0) {
                    currentValue = currentValue.slice(0, -1)
                    updatePhoneValue()
                }
                event.preventDefault()
                return
            }

            const digit = event.data
            if (!digit || !/\d/.test(digit)) {
                event.preventDefault()
                return
            }

            if (currentValue.length < 10) {
                currentValue += digit
                updatePhoneValue()
            }

            event.preventDefault()
        }

        input.addEventListener('focus', function () {
            if (!input.value) {
                input.value = phoneMask
            }
        })

        input.addEventListener('beforeinput', maskPhone)

        input.addEventListener('click', function (e) {
            const firstUnderscorePos = input.value.indexOf('_')
            if (firstUnderscorePos !== -1) {
                input.setSelectionRange(firstUnderscorePos, firstUnderscorePos)
            }
        })

        input.addEventListener('paste', function (e) {
            e.preventDefault()
            const pastedText = (
                e.clipboardData || window.clipboardData
            ).getData('text')
            const numbers = pastedText.replace(/\D/g, '')

            currentValue = numbers.slice(0, 10)
            updatePhoneValue()
        })
    }

    if (phoneInput) {
        initPhoneMask(phoneInput)
    }

    function isValidPhone(phone) {
        return phone.replace(/\D/g, '').length === 11
    }

    callbackBtn.addEventListener('click', function () {
        callbackForm.classList.add('active')
        document.body.classList.add('modal-open')
    })

    exitBtn.addEventListener('click', function () {
        callbackForm.classList.remove('active')
        document.body.classList.remove('modal-open')
    })
    exitBtn.addEventListener('click', closeForm)

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault()

        const inputs = [
            {
                input: document.querySelector('#name'),
                label: document.querySelector('label[for="name"]'),
                validator: (value) => value.trim().length > 0,
            },
            {
                input: document.querySelector('#phone'),
                label: document.querySelector('label[for="phone"]'),
                validator: (value) => isValidPhone(value),
            },
            {
                input: document.querySelector('#email'),
                label: document.querySelector('label[for="email"]'),
                validator: (value) => value.trim().length > 0,
            },
        ]

        removeErrorStyles(inputs)

        let isValid = true
        const errors = []

        inputs.forEach(({ input, label, validator }) => {
            if (!input || !validator(input.value)) {
                isValid = false
                addErrorStyle(input, label)
                errors.push(`Please enter valid ${input.id}`)
            }
        })

        if (!isValid) {
            console.log('Validation errors:', errors)
            return
        }

        const formData = {
            name: inputs[0].input.value.trim(),
            phone: inputs[1].input.value.trim(),
            email: inputs[2].input.value.trim(),
        }

        console.log('Form Data:', formData)

        inputs.forEach(({ input }) => {
            input.value = ''
        })

        callbackForm.classList.remove('active')
        document.body.classList.remove('modal-open')
    })

    function addErrorStyle(input, label) {
        if (input) {
            input.style.borderColor = 'red'
        }
        if (label) {
            label.style.color = 'red'
        }
    }

    function removeErrorStyles(inputs) {
        inputs.forEach(({ input, label }) => {
            if (input) {
                input.style.borderColor = ''
            }
            if (label) {
                label.style.color = ''
            }
        })
    }

    inputs.forEach(({ input, label }) => {
        if (input) {
            input.addEventListener('input', function () {
                input.style.borderColor = ''
                if (label) {
                    label.style.color = ''
                }
            })
        }
    })
})
