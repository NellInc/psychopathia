document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-container {
            position: fixed;
            z-index: 1000;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        /* Desktop styles */
        @media (min-width: 768px) {
            .nav-container {
                position: fixed;
                left: 20px;
                top: 5%;
                transform: translateY(-5%) translateX(5%);
                padding: 15px;
                border-radius: 16px;
                background: rgba(255, 255, 255, 0.5);
                opacity: 0;
                pointer-events: none;
                max-width: 300px;
                width: 300px;
                display: flex;
                flex-direction: column;
            }

            .nav-container.visible {
                opacity: 1;
                pointer-events: all;
                transition: all 1.3s ease;
            }

            .nav-container.collapsed {
                width: auto;
                min-width: 50px;
            }

            .nav-container.collapsed .nav-list {
                display: none;
            }

            .desktop-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                transition: background-color 0.2s ease;
                border-radius: 8px;
                padding: 5px;
                margin: -5px;
            }

            .desktop-header:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }

            .nav-container.collapsed .desktop-header {
                padding: 5px;
                margin: -5px;
            }

            .nav-container:not(.collapsed) .desktop-header {
                padding: 5px 5px 15px 5px;
                margin: -5px -5px 5px -5px;
            }

            .nav-container.collapsed .current-section {
                display: block;
                flex-grow: 1;
                font-size: 14px;
                font-family: 'Poppins', sans-serif;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                opacity: 0.7;
                margin: 0 5px;
            }

            .nav-container:not(.collapsed) .desktop-header .current-section {
                display: none;
            }

            .nav-collapse {
                background: none;
                border: none;
                pointer-events: none;
                padding: 5px;
                margin: 0;
                opacity: 0.3;
                transition: opacity 0.2s ease;
                flex-shrink: 0;
            }

            .desktop-header:hover .nav-collapse {
                opacity: 1;
            }

            .expand-icon {
                display: none;
            }

            .collapsed .expand-icon {
                display: block;
            }

            .collapsed .collapse-icon {
                display: none;
            }

            .nav-header {
                display: none !important;
            }

            .nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
                overflow-y: auto;
                max-height: 70vh;
            }

            .nav-item {
                margin: 10px 0;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
                font-size: 14px;
            }

            .nav-item.h2 {
                padding-left: 15px;
                font-size: 12px;
                margin: 5px 0;
            }

            .nav-item.h3 {
                padding-left: 30px;
                font-size: 11px;
                margin: 3px 0;
                opacity: 0.8;
            }

            .nav-item.active {
                color: #000;
                font-weight: 500;
            }
        }

        /* Mobile styles */
        @media (max-width: 767px) {
            .nav-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.5);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                height: auto;
            }

            .nav-container.visible {
                transform: translateY(0);
            }

            .nav-container.expanded {
                height: 100vh;
                background: rgba(255, 255, 255, 0.95);
            }

            .nav-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }

            .current-section {
                font-size: 14px;
                font-weight: 500;
                color: #000;
                font-family: 'Poppins', sans-serif;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: calc(100% - 40px);
            }

            .nav-close {
                display: none;
                cursor: pointer;
            }

            @media (min-width: 768px) {
                .nav-header {
                    display: none;
                }
            }

            .expanded .nav-close {
                display: block;
            }

            .nav-list {
                display: none;
                list-style: none;
                padding: 20px;
                margin: 0;
                max-height: calc(100vh - 60px);
                overflow-y: auto;
            }

            .expanded .nav-list {
                display: block;
            }

            .nav-item {
                padding: 15px 0;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
                font-size: 16px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }

            .nav-item.h2 {
                padding-left: 20px;
                font-size: 14px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            .nav-item.h3 {
                padding-left: 40px;
                font-size: 12px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.03);
                margin: 8px 0;
            }

            .nav-item.active {
                color: #000;
                font-weight: 500;
            }

            .desktop-header {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    const nav = document.createElement('nav');
    nav.className = 'nav-container';
    nav.innerHTML = `
        <div class="nav-header">
            <span class="current-section"></span>
            <a class="nav-close"><i class="fa-solid fa-xmark"></i></a>
        </div>
        <div class="desktop-header">
            <span class="current-section"></span>
            <button class="nav-collapse">
                <a class="expand-icon"><i class="fa-solid fa-angle-down"></i></a>
                <a class="collapse-icon"><i class="fa-solid fa-arrow-left-long"></i></a>
            </button>
        </div>
        <ul class="nav-list"></ul>
    `;
    document.body.appendChild(nav);

    // Get all h1 and h2 elements within container blog main and populate the navbar
    const h1Elements = Array.from(document.querySelectorAll('.container.blog.main h1'));
    const navList = nav.querySelector('.nav-list');
    
    function resetNavbarState() {
        nav.classList.remove('expanded');
        document.body.style.overflow = '';
    }

    h1Elements.forEach((h1) => {
        // Add h1 element
        const h1Item = document.createElement('li');
        h1Item.className = 'nav-item h1';
        h1Item.textContent = h1.textContent.trim();
        h1Item.addEventListener('click', () => {
            h1.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth < 768) {
                resetNavbarState();
            }
        });
        navList.appendChild(h1Item);

        // Find the parent container of this H1
        const parentContainer = h1.closest('.container.blog.main');
        if (parentContainer) {
            // Find all h2 and h3 elements within this container, after this h1
            const allHeadings = Array.from(parentContainer.querySelectorAll('h2, h3'));
            const h1Index = Array.from(parentContainer.querySelectorAll('h1')).indexOf(h1);
            const nextH1 = Array.from(parentContainer.querySelectorAll('h1'))[h1Index + 1];
            
            // Filter headings that come after this h1 but before the next h1
            const sectionHeadings = allHeadings.filter(heading => {
                const headingPos = heading.compareDocumentPosition(h1);
                const afterH1 = (headingPos & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
                
                if (!afterH1) return false;
                
                if (nextH1) {
                    const nextH1Pos = heading.compareDocumentPosition(nextH1);
                    const beforeNextH1 = (nextH1Pos & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
                    return beforeNextH1;
                }
                return true;
            });
            
            // Add the filtered headings to navigation
            sectionHeadings.forEach(heading => {
                if (heading.tagName === 'H2') {
                    const h2Item = document.createElement('li');
                    h2Item.className = 'nav-item h2';
                    h2Item.textContent = heading.textContent.trim();
                    h2Item.addEventListener('click', () => {
                        heading.scrollIntoView({ behavior: 'smooth' });
                        if (window.innerWidth < 768) {
                            resetNavbarState();
                        }
                    });
                    navList.appendChild(h2Item);
                } else if (heading.tagName === 'H3') {
                    const h3Item = document.createElement('li');
                    h3Item.className = 'nav-item h3';
                    h3Item.textContent = heading.textContent.trim();
                    h3Item.addEventListener('click', () => {
                        heading.scrollIntoView({ behavior: 'smooth' });
                        if (window.innerWidth < 768) {
                            resetNavbarState();
                        }
                    });
                    navList.appendChild(h3Item);
                }
            });
        }
    });

    // Desktop header click handling - make entire area clickable
    const desktopHeader = nav.querySelector('.desktop-header');
    desktopHeader.addEventListener('click', () => {
        if (window.innerWidth >= 768) {
            nav.classList.toggle('collapsed');
        }
    });

    // Mobile navigation toggle
    const navHeader = nav.querySelector('.nav-header');
    const closeBtn = nav.querySelector('.nav-close');

    navHeader.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && e.target !== closeBtn) {
            nav.classList.toggle('expanded');
            document.body.style.overflow = nav.classList.contains('expanded') ? 'hidden' : '';
        }
    });



    // Scroll handling
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const isMobile = window.innerWidth < 768;

        // Find the active section based on page segments
        let activeH1 = null;
        let activeH2 = null;
        let activeH3 = null;
        const scrollPosition = window.scrollY + 10; // Add small offset for better detection

        // Find active H1 section
        h1Elements.forEach((h1, index) => {
            const currentPos = h1.offsetTop;
            const nextH1 = h1Elements[index + 1];
            const nextPos = nextH1 ? nextH1.offsetTop : document.documentElement.scrollHeight;

            if (scrollPosition >= currentPos && scrollPosition < nextPos) {
                activeH1 = h1;
                
                // Find active H2 and H3 within this H1 section using the same container approach
                const parentContainer = h1.closest('.container.blog.main');
                if (parentContainer) {
                    const allHeadings = Array.from(parentContainer.querySelectorAll('h2, h3'));
                    const h1Index = Array.from(parentContainer.querySelectorAll('h1')).indexOf(h1);
                    const nextH1Element = Array.from(parentContainer.querySelectorAll('h1'))[h1Index + 1];
                    
                    // Filter headings that come after this h1 but before the next h1
                    const sectionHeadings = allHeadings.filter(heading => {
                        const headingPos = heading.compareDocumentPosition(h1);
                        const afterH1 = (headingPos & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
                        
                        if (!afterH1) return false;
                        
                        if (nextH1Element) {
                            const nextH1Pos = heading.compareDocumentPosition(nextH1Element);
                            const beforeNextH1 = (nextH1Pos & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
                            return beforeNextH1;
                        }
                        return true;
                    });
                    
                    // Find active H2 and H3 within the section
                    const h2Elements = sectionHeadings.filter(h => h.tagName === 'H2');
                    const h3Elements = sectionHeadings.filter(h => h.tagName === 'H3');
                    
                    // Check H2 elements (with buffer to allow H1 intro sections to be highlighted)
                    h2Elements.forEach((h2, h2Index) => {
                        const h2Pos = h2.offsetTop;
                        const nextH2 = h2Elements[h2Index + 1];
                        let nextH2Pos;
                        
                        if (nextH2) {
                            nextH2Pos = nextH2.offsetTop;
                        } else if (nextH1Element) {
                            nextH2Pos = nextH1Element.offsetTop;
                        } else {
                            nextH2Pos = document.documentElement.scrollHeight;
                        }
                        
                        // Add buffer before H2 activation - only activate H2 when we're significantly past it
                        const h2ActivationBuffer = 80; // pixels after H2 before it becomes active
                        if (scrollPosition >= h2Pos + h2ActivationBuffer && scrollPosition < nextH2Pos) {
                            activeH2 = h2;
                        }
                    });
                    
                    // Check H3 elements (with buffer to allow H1 intro sections to be highlighted)
                    h3Elements.forEach((h3, h3Index) => {
                        const h3Pos = h3.offsetTop;
                        const nextH3 = h3Elements[h3Index + 1];
                        let nextH3Pos;
                        
                        if (nextH3) {
                            nextH3Pos = nextH3.offsetTop;
                        } else if (activeH2) {
                            // Find next H2 after the active one
                            const activeH2Index = h2Elements.indexOf(activeH2);
                            const nextH2AfterActive = h2Elements[activeH2Index + 1];
                            nextH3Pos = nextH2AfterActive ? nextH2AfterActive.offsetTop : (nextH1Element ? nextH1Element.offsetTop : document.documentElement.scrollHeight);
                        } else if (nextH1Element) {
                            nextH3Pos = nextH1Element.offsetTop;
                        } else {
                            nextH3Pos = document.documentElement.scrollHeight;
                        }
                        
                        // Add buffer before H3 activation - only activate H3 when we're significantly past it
                        // This allows the H1 intro sections to stay highlighted longer
                        const h3ActivationBuffer = 100; // pixels after H3 before it becomes active
                        if (scrollPosition >= h3Pos + h3ActivationBuffer && scrollPosition < nextH3Pos) {
                            activeH3 = h3;
                        }
                    });
                }
            }
        });

        // Update active states and section displays
        const navItems = nav.querySelectorAll('.nav-item');
        const currentSections = nav.querySelectorAll('.current-section');
        
        if (activeH1) {
            navItems.forEach((item) => {
                // Only highlight the most specific active element
                let shouldHighlight = false;
                
                if (activeH3 && item.classList.contains('h3') && activeH3.textContent.trim() === item.textContent) {
                    shouldHighlight = true;
                } else if (!activeH3 && activeH2 && item.classList.contains('h2') && activeH2.textContent.trim() === item.textContent) {
                    shouldHighlight = true;
                } else if (!activeH3 && !activeH2 && item.classList.contains('h1') && activeH1.textContent.trim() === item.textContent) {
                    shouldHighlight = true;
                }
                
                if (shouldHighlight) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Update all current section displays
            let displayText;
            if (activeH3) {
                displayText = `${activeH1.textContent.trim()} > ${activeH3.textContent.trim()}`;
            } else if (activeH2) {
                displayText = `${activeH1.textContent.trim()} > ${activeH2.textContent.trim()}`;
            } else {
                displayText = activeH1.textContent.trim();
            }
                
            currentSections.forEach(section => {
                section.textContent = displayText;
            });
            
            nav.classList.add('has-active');
            
            // Auto-scroll navigation to keep active item visible
            const activeItem = nav.querySelector('.nav-item.active');
            if (activeItem) {
                const navList = nav.querySelector('.nav-list');
                if (navList) {
                    const navListRect = navList.getBoundingClientRect();
                    const activeItemRect = activeItem.getBoundingClientRect();
                    
                    // Calculate if the active item is outside the visible area
                    const itemTop = activeItemRect.top - navListRect.top + navList.scrollTop;
                    const itemBottom = itemTop + activeItemRect.height;
                    const visibleTop = navList.scrollTop;
                    const visibleBottom = visibleTop + navListRect.height;
                    
                    // Add some padding for better visibility
                    const padding = 60;
                    
                    if (itemTop < visibleTop + padding) {
                        // Item is above visible area, scroll up
                        navList.scrollTo({
                            top: Math.max(0, itemTop - padding),
                            behavior: 'smooth'
                        });
                    } else if (itemBottom > visibleBottom - padding) {
                        // Item is below visible area, scroll down
                        navList.scrollTo({
                            top: itemBottom - navListRect.height + padding,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        } else {
            navItems.forEach(item => item.classList.remove('active'));
            currentSections.forEach(section => {
                section.textContent = '';
            });
            nav.classList.remove('has-active');
        }

        // Special handling for visibility
        const firstH1 = h1Elements[0];
        const firstH1Passed = firstH1 && window.scrollY + 10 >= firstH1.offsetTop;
        
        // Handle visibility
        if (isMobile) {
            if (!nav.classList.contains('expanded')) {
                if (!firstH1Passed) {
                    nav.classList.remove('visible');
                } else {
                    if (scrollTop > lastScrollTop) {
                        if (scrollTop > 50) {
                            nav.classList.remove('visible');
                        }
                    } else {
                        nav.classList.add('visible');
                    }
                }
            }
        } else {
            if (!firstH1Passed) {
                nav.classList.remove('visible');
            } else {
                nav.classList.add('visible');
            }
        }

        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
            });
            ticking = true;
        }
    });

    updateNavbar();
});