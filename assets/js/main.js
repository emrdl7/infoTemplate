import { AccessibilityManager } from './modules/accessibility.js';
import { ResponsiveManager } from './modules/responsive.js';

class SiteInitializer {
    constructor() {
        this.init();
    }

    init() {
        new AccessibilityManager();
        new ResponsiveManager();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SiteInitializer();
});