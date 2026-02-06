export class AccessibilityManager {
    constructor() {
        this.initKeyboardNavigation();
        this.enhanceFocusStyles();
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
            }
        });
    }

    enhanceFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .user-is-tabbing *:focus {
                outline: 2px solid blue;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    static trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        });
    }
}