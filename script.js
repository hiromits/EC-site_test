// Apple風 一流品質 JavaScript
class PremiumECommerceApp {
  constructor() {
    this.cart = [];
    this.isCartOpen = false;
    this.currentSection = 'home';
    
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupHeroAnimations();
    this.setupScrollAnimations();
    this.setupProductCards();
    this.setupCart();
    this.setupPricingToggle();
    this.setupParallaxEffects();
    this.setupCursorEffects();
    this.setupLoadingAnimations();
    this.setupHeroButtons();
    
    // Intersection Observer for animations
    this.observeElements();
  }

  // ナビゲーション設定
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Navigation setup:', { navLinks: navLinks.length, menuToggle, navMenu });

    // スムーズスクロール
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // アクティブリンクの更新
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          
          // モバイルメニューを閉じる
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle?.classList.remove('active');
          }
        }
      });
    });

    // モバイルメニュー
    menuToggle?.addEventListener('click', (e) => {
      console.log('Menu toggle clicked!');
      e.stopPropagation();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      console.log('Menu classes after toggle:', { menuActive: navMenu.classList.contains('active'), toggleActive: menuToggle.classList.contains('active') });
    });
    
    // メニュー外をクリックして閉じる
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          menuToggle?.classList.remove('active');
        }
      }
    });

    // スクロール時のナビゲーション背景変更
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.nav-header');
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
      }
    });
  }

  // ヒーローセクションアニメーション
  setupHeroAnimations() {
    const heroSmartphone = document.querySelector('.hero-smartphone');
    const heroContent = document.querySelector('.hero-content');

    // スマホの3Dエフェクト
    if (heroSmartphone) {
      heroSmartphone.addEventListener('mousemove', (e) => {
        const rect = heroSmartphone.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 10;
        const rotateY = -(x / rect.width) * 15;
        
        heroSmartphone.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(30px)
          scale(1.02)
        `;
      });

      heroSmartphone.addEventListener('mouseleave', () => {
        heroSmartphone.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(5deg) translateZ(0)';
      });
    }

    // ヒーロー鍵アプリのアニメーション
    this.setupHeroLockAnimation();

    // タイピングアニメーション
    this.typeWriter();
  }

  // ヒーロー専用の鍵アプリアニメーション
  setupHeroLockAnimation() {
    const barLockBtn = document.querySelector('.bar-lock-hero');
    const mainLockBtn = document.querySelector('.main-lock-hero');
    const completeSection = document.querySelector('.hero-complete');
    const fingerTouch = document.querySelector('.hero-finger');
    const pointsDisplay = document.querySelector('.hero-phone-content .points-display-mobile');
    
    if (!barLockBtn || !mainLockBtn || !completeSection || !fingerTouch) return;
    
    let heroAnimationStep = 0;
    const heroSteps = [
      () => this.simulateHeroTouch(barLockBtn, fingerTouch, () => {
        barLockBtn.classList.add('locked');
        barLockBtn.querySelector('.lock-icon-mobile').textContent = '🔒';
        this.updateLockButtonStyle(barLockBtn, true);
        
        // グロー効果追加
        barLockBtn.style.boxShadow = '0 0 30px rgba(79, 172, 254, 0.6), 0 6px 20px rgba(79, 172, 254, 0.4)';
      }),
      () => {
        // 両方ロックされたので完了ボタンを表示
        completeSection.style.display = 'block';
        completeSection.style.animation = 'slideInUp 0.6s ease';
        
        // 画面全体のグロー効果
        const phoneContent = document.querySelector('.hero-phone-content');
        if (phoneContent) {
          phoneContent.style.boxShadow = '0 0 40px rgba(0, 122, 255, 0.3)';
        }
      },
      () => this.simulateHeroTouch(completeSection.querySelector('.complete-btn-mobile'), fingerTouch, () => {
        // ポイント更新アニメーション
        if (pointsDisplay) {
          const currentPoints = parseInt(pointsDisplay.textContent.match(/\d+/)[0]);
          const newPoints = currentPoints + 12;
          this.animatePointsUpdate(pointsDisplay, currentPoints, newPoints);
        }
        
        // 大きな成功エフェクト
        this.createHeroSuccessEffect();
        
        // 完了ボタンを隠す
        setTimeout(() => {
          completeSection.style.display = 'none';
          
          // グロー効果をリセット
          const phoneContent = document.querySelector('.hero-phone-content');
          if (phoneContent) {
            phoneContent.style.boxShadow = '';
          }
        }, 1500);
      }),
      () => {
        // リセット準備
        setTimeout(() => {
          barLockBtn.classList.remove('locked');
          barLockBtn.querySelector('.lock-icon-mobile').textContent = '🔓';
          this.updateLockButtonStyle(barLockBtn, false);
          barLockBtn.style.boxShadow = '';
          heroAnimationStep = 0;
        }, 2000);
      }
    ];
    
    const runHeroAnimation = () => {
      if (heroAnimationStep < heroSteps.length) {
        heroSteps[heroAnimationStep]();
        heroAnimationStep++;
        setTimeout(runHeroAnimation, 4000);
      } else {
        // アニメーションをループ
        setTimeout(() => {
          heroAnimationStep = 0;
          runHeroAnimation();
        }, 6000);
      }
    };
    
    // 初回実行を遅延
    setTimeout(runHeroAnimation, 3000);
  }

  // ヒーロー専用タッチエフェクト
  simulateHeroTouch(element, fingerTouch, callback) {
    const rect = element.getBoundingClientRect();
    const phoneRect = element.closest('.hero-phone-content').getBoundingClientRect();
    
    // 指の位置を計算
    const x = (rect.left + rect.width / 2) - phoneRect.left;
    const y = (rect.top + rect.height / 2) - phoneRect.top;
    
    fingerTouch.style.left = x + 'px';
    fingerTouch.style.top = y + 'px';
    fingerTouch.style.width = '30px';
    fingerTouch.style.height = '30px';
    fingerTouch.classList.add('active');
    
    // タッチエフェクトを表示
    setTimeout(() => {
      fingerTouch.classList.remove('active');
      callback();
    }, 400);
  }

  // ヒーロー専用成功エフェクト
  createHeroSuccessEffect() {
    const heroSection = document.querySelector('.hero-section');
    const phoneScreen = document.querySelector('.hero-phone-screen');
    
    if (!phoneScreen) return;
    
    // 大きなパーティクル効果
    const particles = ['✨', '⭐', '💫', '🎉', '🔒', '🏠', '🛡️'];
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
          position: absolute;
          font-size: ${20 + Math.random() * 20}px;
          pointer-events: none;
          z-index: 1000;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: heroParticleFloat 3s ease-out forwards;
          color: ${['#007AFF', '#5856D6', '#34C759', '#FF9500', '#FF3B30'][Math.floor(Math.random() * 5)]};
        `;
        
        phoneScreen.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 3000);
      }, i * 80);
    }
    
    // 画面全体の一時的なグロー
    if (heroSection) {
      heroSection.style.background = 'linear-gradient(135deg, rgba(0, 122, 255, 0.05), rgba(88, 86, 214, 0.05))';
      setTimeout(() => {
        heroSection.style.background = '';
      }, 2000);
    }
  }

  // タイピングエフェクト
  typeWriter() {
    const titleMain = document.querySelector('.hero-title-main');
    const titleSub = document.querySelector('.hero-title-sub');
    
    if (!titleMain || !titleSub) return;

    const mainText = titleMain.textContent;
    const subText = titleSub.textContent;
    
    titleMain.textContent = '';
    titleSub.textContent = '';
    
    let mainIndex = 0;
    let subIndex = 0;

    const typeMain = () => {
      if (mainIndex < mainText.length) {
        titleMain.textContent += mainText.charAt(mainIndex);
        mainIndex++;
        setTimeout(typeMain, 100);
      } else {
        setTimeout(typeSub, 500);
      }
    };

    const typeSub = () => {
      if (subIndex < subText.length) {
        titleSub.textContent += subText.charAt(subIndex);
        subIndex++;
        setTimeout(typeSub, 80);
      }
    };

    setTimeout(typeMain, 1000);
  }

  // スクロールアニメーション
  setupScrollAnimations() {
    // パララックス効果
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero-visual, .hero-device');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });

    // セクション間の遷移効果
    this.setupSectionTransitions();
  }

  // セクション遷移
  setupSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // ナビゲーションアクティブ状態更新
          const sectionId = entry.target.id;
          if (sectionId) {
            const navLink = document.querySelector(`[href="#${sectionId}"]`);
            if (navLink) {
              document.querySelectorAll('.nav-link').forEach(link => 
                link.classList.remove('active')
              );
              navLink.classList.add('active');
            }
          }
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // プロダクトカード設定
  setupProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
      // ホバーエフェクト強化
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) scale(1.02)';
        card.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.15)';
        
        // プレビューアニメーション
        const preview = card.querySelector('.preview-screen');
        if (preview) {
          preview.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.1)';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        
        const preview = card.querySelector('.preview-screen');
        if (preview) {
          preview.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(10deg) scale(1)';
        }
      });

      // カートに追加ボタン
      const addToCartBtn = card.querySelector('.product-btn');
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.addToCart(card);
        });
      }

      // プロダクトプレビューアニメーション
      this.animateProductPreview(card);
    });
  }

  // プロダクトプレビューアニメーション
  animateProductPreview(card) {
    const productType = card.getAttribute('data-product');
    
    switch (productType) {
      case 'productivity':
        this.animateTodoItems(card);
        break;
      case 'analytics':
        this.animateChartBars(card);
        break;
      case 'ecommerce':
        this.animateProductGrid(card);
        break;
      case 'lock-app':
        this.animateLockApp(card);
        break;
      case 'todo-app':
        this.animateTodoApp(card);
        break;
      case 'suika-game':
        this.animateSuikaGame(card);
        break;
    }
  }

  animateTodoItems(card) {
    const todoItems = card.querySelectorAll('.todo-item');
    
    setInterval(() => {
      todoItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'scale(1.05)';
          setTimeout(() => {
            item.style.transform = 'scale(1)';
          }, 200);
        }, index * 500);
      });
    }, 3000);
  }

  animateChartBars(card) {
    const chartBars = card.querySelectorAll('.chart-bar');
    
    setInterval(() => {
      chartBars.forEach((bar, index) => {
        const randomHeight = Math.random() * 80 + 20;
        setTimeout(() => {
          bar.style.height = `${randomHeight}%`;
        }, index * 200);
      });
    }, 2000);
  }

  animateProductGrid(card) {
    const miniProducts = card.querySelectorAll('.mini-product');
    
    setInterval(() => {
      miniProducts.forEach((product, index) => {
        setTimeout(() => {
          product.style.background = `hsl(${Math.random() * 360}, 70%, 90%)`;
          setTimeout(() => {
            product.style.background = '';
          }, 500);
        }, index * 300);
      });
    }, 4000);
  }

  // 鍵アプリのリアルなアニメーション
  animateLockApp(card) {
    const barLockBtn = card.querySelector('.bar-lock');
    const mainLockBtn = card.querySelector('.main-lock');
    const completeSection = card.querySelector('.complete-section-mobile');
    const fingerTouch = card.querySelector('.finger-touch');
    const pointsDisplay = card.querySelector('.points-display-mobile');
    
    if (!barLockBtn || !mainLockBtn || !completeSection || !fingerTouch) return;
    
    let animationStep = 0;
    const steps = [
      () => this.simulateTouch(barLockBtn, fingerTouch, () => {
        barLockBtn.classList.add('locked');
        barLockBtn.querySelector('.lock-icon-mobile').textContent = '🔒';
        this.updateLockButtonStyle(barLockBtn, true);
      }),
      () => {
        // 両方ロックされたので完了ボタンを表示
        completeSection.style.display = 'block';
        completeSection.style.animation = 'slideInUp 0.5s ease';
      },
      () => this.simulateTouch(completeSection.querySelector('.complete-btn-mobile'), fingerTouch, () => {
        // ポイント更新アニメーション
        const currentPoints = parseInt(pointsDisplay.textContent.match(/\d+/)[0]);
        const newPoints = currentPoints + 12;
        
        this.animatePointsUpdate(pointsDisplay, currentPoints, newPoints);
        
        // 成功エフェクト
        this.createSuccessParticles(card);
        
        // 完了ボタンを隠す
        setTimeout(() => {
          completeSection.style.display = 'none';
        }, 1000);
      }),
      () => {
        // リセット準備
        setTimeout(() => {
          barLockBtn.classList.remove('locked');
          barLockBtn.querySelector('.lock-icon-mobile').textContent = '🔓';
          this.updateLockButtonStyle(barLockBtn, false);
          animationStep = 0;
        }, 2000);
      }
    ];
    
    const runAnimation = () => {
      if (animationStep < steps.length) {
        steps[animationStep]();
        animationStep++;
        setTimeout(runAnimation, 3000);
      } else {
        // アニメーションをループ
        setTimeout(() => {
          animationStep = 0;
          runAnimation();
        }, 4000);
      }
    };
    
    // 初回実行を遅延
    setTimeout(runAnimation, 2000);
  }

  // タッチエフェクトシミュレーション
  simulateTouch(element, fingerTouch, callback) {
    const rect = element.getBoundingClientRect();
    const cardRect = element.closest('.product-card').getBoundingClientRect();
    
    // 指の位置を計算
    const x = (rect.left + rect.width / 2) - cardRect.left;
    const y = (rect.top + rect.height / 2) - cardRect.top;
    
    fingerTouch.style.left = x + 'px';
    fingerTouch.style.top = y + 'px';
    fingerTouch.classList.add('active');
    
    // タッチエフェクトを表示
    setTimeout(() => {
      fingerTouch.classList.remove('active');
      callback();
    }, 300);
  }

  // ロックボタンのスタイル更新
  updateLockButtonStyle(button, isLocked) {
    if (isLocked) {
      button.style.background = 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 50%, #4FACFE 100%)';
      button.style.color = 'white';
      button.style.boxShadow = '0 6px 20px rgba(79, 172, 254, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
    } else {
      button.style.background = 'linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%)';
      button.style.color = '#6B7280';
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)';
    }
  }

  // ポイント更新アニメーション
  animatePointsUpdate(element, startPoints, endPoints) {
    const duration = 1000;
    const startTime = performance.now();
    
    const updatePoints = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // イージング関数
      const easeOutBounce = (t) => {
        if (t < 1/2.75) {
          return 7.5625 * t * t;
        } else if (t < 2/2.75) {
          return 7.5625 * (t -= 1.5/2.75) * t + 0.75;
        } else if (t < 2.5/2.75) {
          return 7.5625 * (t -= 2.25/2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
        }
      };
      
      const currentPoints = Math.floor(startPoints + (endPoints - startPoints) * easeOutBounce(progress));
      element.innerHTML = `⭐ ${currentPoints}pt`;
      
      if (progress < 1) {
        requestAnimationFrame(updatePoints);
      }
    };
    
    requestAnimationFrame(updatePoints);
  }

  // 成功時のパーティクルエフェクト
  createSuccessParticles(card) {
    const particles = ['✨', '⭐', '💫', '🎉'];
    const phoneScreen = card.querySelector('.phone-screen');
    
    if (!phoneScreen) return;
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
          position: absolute;
          font-size: 16px;
          pointer-events: none;
          z-index: 1000;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: particleFloat 2s ease-out forwards;
        `;
        
        phoneScreen.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 2000);
      }, i * 100);
    }
  }

  // ToDoアプリのアニメーション
  animateTodoApp(card) {
    const todoItems = card.querySelectorAll('.todo-item:not(.completed)');
    const addBtn = card.querySelector('.todo-add-btn');
    const statsItems = card.querySelectorAll('.stats-item');
    
    if (!todoItems.length || !addBtn) return;
    
    let currentItem = 0;
    
    const animateNextTodo = () => {
      if (currentItem < todoItems.length) {
        const item = todoItems[currentItem];
        const checkbox = item.querySelector('.todo-checkbox');
        const text = item.querySelector('.todo-text');
        
        // チェックボックスをアニメーション
        setTimeout(() => {
          checkbox.textContent = '✓';
          checkbox.classList.add('checked');
          text.classList.add('completed');
          
          // 統計更新
          if (statsItems.length >= 2) {
            const completedStat = statsItems[0];
            const remainingStat = statsItems[1];
            const completed = parseInt(completedStat.textContent.match(/\d+/)[0]) + 1;
            const remaining = parseInt(remainingStat.textContent.match(/\d+/)[0]) - 1;
            
            completedStat.textContent = `完了: ${completed}`;
            remainingStat.textContent = `残り: ${remaining}`;
          }
          
          // 成功エフェクト
          this.createTodoParticles(item);
          
          currentItem++;
          
          // 次のアイテムに進む
          setTimeout(animateNextTodo, 2000);
        }, 1000);
      } else {
        // 全て完了したらリセット
        setTimeout(() => {
          todoItems.forEach(item => {
            const checkbox = item.querySelector('.todo-checkbox');
            const text = item.querySelector('.todo-text');
            checkbox.textContent = '○';
            checkbox.classList.remove('checked');
            text.classList.remove('completed');
          });
          
          // 統計リセット
          if (statsItems.length >= 2) {
            statsItems[0].textContent = '完了: 1';
            statsItems[1].textContent = '残り: 2';
          }
          
          currentItem = 0;
          setTimeout(animateNextTodo, 1000);
        }, 3000);
      }
    };
    
    // 初回実行
    setTimeout(animateNextTodo, 2000);
    
    // 追加ボタンのアニメーション
    setInterval(() => {
      addBtn.style.transform = 'scale(1.2) rotate(90deg)';
      setTimeout(() => {
        addBtn.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    }, 4000);
  }

  // スイカゲームのアニメーション
  animateSuikaGame(card) {
    const fruitsInGame = card.querySelectorAll('.fruit-in-game');
    const droppingFruit = card.querySelector('.fruit-in-game.dropping');
    const scoreElement = card.querySelector('.game-score');
    const nextFruitIcon = card.querySelector('.next-fruit-icon');
    const fruitsBar = card.querySelectorAll('.fruit-icon');
    
    if (!fruitsInGame.length || !droppingFruit || !scoreElement) return;
    
    let score = 1250;
    const fruits = ['🍒', '🍓', '🍇', '🍊', '🍋', '🍎', '🍑', '🥝', '🍈', '🍉'];
    
    const animateGameplay = () => {
      // ドロップアニメーション
      droppingFruit.style.animation = 'fruitDrop 2s ease-in forwards';
      
      setTimeout(() => {
        // 果物が着地
        droppingFruit.style.top = '75%';
        droppingFruit.style.animation = 'fruitFloat 3s ease-in-out infinite';
        
        // スコア更新
        score += Math.floor(Math.random() * 200) + 50;
        scoreElement.textContent = `スコア: ${score.toLocaleString()}`;
        
        // 合成エフェクト
        this.createFruitMergeEffect(card);
        
        // 新しい果物をドロップ位置にセット
        setTimeout(() => {
          const randomFruit = fruits[Math.floor(Math.random() * 5)]; // 小さい果物のみ
          droppingFruit.textContent = randomFruit;
          droppingFruit.style.top = '10%';
          droppingFruit.style.left = (Math.random() * 60 + 20) + '%';
          
          // 次の果物更新
          if (nextFruitIcon) {
            nextFruitIcon.textContent = fruits[Math.floor(Math.random() * 5)];
          }
          
        }, 1000);
        
      }, 2000);
    };
    
    // 定期的にゲームプレイをシミュレート
    setInterval(animateGameplay, 5000);
    
    // 果物バーのアニメーション強化
    fruitsBar.forEach((fruit, index) => {
      fruit.addEventListener('mouseenter', () => {
        fruit.style.transform = 'scale(1.3) rotate(10deg)';
      });
      
      fruit.addEventListener('mouseleave', () => {
        fruit.style.transform = 'scale(1) rotate(0deg)';
      });
      
      // ランダムなバウンス
      setInterval(() => {
        if (Math.random() < 0.3) {
          fruit.style.animation = 'none';
          fruit.offsetHeight; // リフロー
          fruit.style.animation = 'fruitBounce 0.6s ease-out';
        }
      }, 3000 + index * 500);
    });
  }

  // ToDoパーティクルエフェクト
  createTodoParticles(todoItem) {
    const particles = ['✨', '⭐', '✓', '🎉'];
    const rect = todoItem.getBoundingClientRect();
    const cardRect = todoItem.closest('.product-card').getBoundingClientRect();
    
    for (let i = 0; i < 4; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.cssText = `
        position: absolute;
        font-size: 14px;
        pointer-events: none;
        z-index: 1000;
        left: ${(rect.left - cardRect.left) + Math.random() * rect.width}px;
        top: ${(rect.top - cardRect.top) + Math.random() * rect.height}px;
        animation: todoParticleFloat 1.5s ease-out forwards;
        color: #34C759;
      `;
      
      todoItem.closest('.product-card').appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1500);
    }
  }

  // 果物合成エフェクト
  createFruitMergeEffect(card) {
    const gameArea = card.querySelector('.game-area');
    if (!gameArea) return;
    
    // 合成エフェクト
    const mergeEffect = document.createElement('div');
    mergeEffect.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      z-index: 1000;
      animation: fruitMerge 1s ease-out forwards;
      pointer-events: none;
    `;
    mergeEffect.textContent = '💥';
    
    gameArea.appendChild(mergeEffect);
    
    setTimeout(() => {
      if (mergeEffect.parentNode) {
        mergeEffect.parentNode.removeChild(mergeEffect);
      }
    }, 1000);
    
    // ゲームエリアの一時的なグロー
    gameArea.style.boxShadow = '0 0 20px rgba(255, 165, 0, 0.6)';
    setTimeout(() => {
      gameArea.style.boxShadow = '';
    }, 500);
  }

  // カート機能
  setupCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const cartOverlay = document.querySelector('.cart-overlay');
    const checkoutBtn = document.querySelector('.checkout-btn');

    cartBtn?.addEventListener('click', () => this.toggleCart());
    cartClose?.addEventListener('click', () => this.closeCart());
    cartOverlay?.addEventListener('click', () => this.closeCart());
    checkoutBtn?.addEventListener('click', () => this.checkout());

    // ESCキーでカートを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isCartOpen) {
        this.closeCart();
      }
    });
  }

  addToCart(productCard) {
    const productTitle = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.price-amount').textContent;
    const productType = productCard.getAttribute('data-product');
    
    // 商品タイプに応じたアイコンを設定
    const productIcons = {
      'lock-app': '🔐',
      'todo-app': '✅',
      'fruit-game': '🍎'
    };
    
    const product = {
      id: Date.now(),
      title: productTitle,
      price: parseInt(productPrice.replace(/,/g, '')),
      image: productIcons[productType] || '📱',
      quantity: 1
    };

    // 既存商品チェック
    const existingProduct = this.cart.find(item => item.title === product.title);
    
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cart.push(product);
    }

    // ボタンアニメーション
    const btn = productCard.querySelector('.product-btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>追加完了!</span>';
    btn.style.background = 'linear-gradient(135deg, #34C759, #30A46C)';
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);

    // カート更新
    this.updateCart();
    this.showCartAnimation();
  }

  updateCart() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const cartEmpty = document.querySelector('.cart-empty');

    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // カート数更新
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.classList.toggle('show', totalItems > 0);
    }

    // カート内容更新
    if (cartItems) {
      cartItems.innerHTML = '';
      
      if (this.cart.length === 0) {
        cartEmpty.style.display = 'block';
      } else {
        cartEmpty.style.display = 'none';
        
        this.cart.forEach(item => {
          const cartItem = this.createCartItem(item);
          cartItems.appendChild(cartItem);
        });
      }
    }

    // 合計金額更新
    if (totalAmount) {
      totalAmount.textContent = total.toLocaleString();
    }
  }

  createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <span class="cart-item-icon">${item.image}</span>
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-id="${item.id}">−</button>
          <span class="quantity-number">${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.id}">＋</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    // イベントリスナー追加
    this.setupCartItemEvents(cartItem);
    
    return cartItem;
  }

  setupCartItemEvents(cartItem) {
    const minusBtn = cartItem.querySelector('.minus');
    const plusBtn = cartItem.querySelector('.plus');
    const removeBtn = cartItem.querySelector('.cart-item-remove');

    minusBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const button = e.target.closest('.quantity-btn');
      const id = parseInt(button.getAttribute('data-id'));
      this.updateQuantity(id, -1);
    });

    plusBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const button = e.target.closest('.quantity-btn');
      const id = parseInt(button.getAttribute('data-id'));
      this.updateQuantity(id, 1);
    });

    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const button = e.target.closest('.cart-item-remove');
      const id = parseInt(button.getAttribute('data-id'));
      this.removeFromCart(id);
    });
  }

  updateQuantity(id, change) {
    const item = this.cart.find(item => item.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(id);
      } else {
        this.updateCart();
      }
    }
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.updateCart();
  }

  toggleCart() {
    if (this.isCartOpen) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }

  openCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartSidebar?.classList.add('open');
    cartOverlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
    this.isCartOpen = true;
  }

  closeCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartSidebar?.classList.remove('open');
    cartOverlay?.classList.remove('show');
    document.body.style.overflow = '';
    this.isCartOpen = false;
  }

  showCartAnimation() {
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn?.style.setProperty('animation', 'bounce 0.6s ease');
    
    setTimeout(() => {
      cartBtn?.style.removeProperty('animation');
    }, 600);
  }

  // プライシング切り替え
  setupPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.price-amount.monthly');
    const yearlyPrices = document.querySelectorAll('.price-amount.yearly');

    toggle?.addEventListener('change', () => {
      if (toggle.checked) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        yearlyPrices.forEach(price => price.style.display = 'inline-block');
      } else {
        monthlyPrices.forEach(price => price.style.display = 'inline-block');
        yearlyPrices.forEach(price => price.style.display = 'none');
      }
    });
  }

  // パララックス効果
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      // ヒーローセクション
      const heroElements = document.querySelectorAll('.hero-visual');
      heroElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
      });

      // 背景要素
      const bgElements = document.querySelectorAll('.parallax-bg');
      bgElements.forEach(element => {
        const speed = element.dataset.speed || 0.3;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // カーソルエフェクト
  setupCursorEffects() {
    if (window.innerWidth > 1024) { // デスクトップのみ
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);

      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      const animateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
      };
      
      animateCursor();

      // ホバーエフェクト
      const hoverElements = document.querySelectorAll('button, a, .product-card');
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
        });
      });
    }
  }

  // 要素監視
  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // カウンターアニメーション
          if (entry.target.classList.contains('counter')) {
            this.animateCounter(entry.target);
          }
          
          // プログレスバーアニメーション
          if (entry.target.classList.contains('progress-bar')) {
            this.animateProgressBar(entry.target);
          }
        }
      });
    }, observerOptions);

    // 監視する要素
    const elementsToObserve = document.querySelectorAll(`
      .feature-card,
      .product-card,
      .testimonial-card,
      .pricing-card,
      .counter,
      .progress-bar
    `);

    elementsToObserve.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  // カウンターアニメーション
  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // プログレスバーアニメーション
  animateProgressBar(element) {
    const target = element.getAttribute('data-progress');
    element.style.width = target + '%';
  }

  // ローディングアニメーション
  setupLoadingAnimations() {
    // ページ読み込み完了時
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // スプラッシュスクリーンフェードアウト
      const splash = document.querySelector('.splash-screen');
      if (splash) {
        setTimeout(() => {
          splash.style.opacity = '0';
          setTimeout(() => {
            splash.remove();
          }, 500);
        }, 1000);
      }
    });

    // 遅延読み込み画像
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ページ遷移エフェクト
  setupPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // ページ全体をフェードアウト
          document.body.style.opacity = '0.7';
          
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // フェードイン
            document.body.style.opacity = '1';
          }, 200);
        }
      });
    });
  }

  // ヒーローボタン設定
  setupHeroButtons() {
    const purchaseBtn = document.querySelector('.btn-primary.hero-btn');
    const tryBtn = document.querySelector('.btn-secondary.hero-btn');
    
    purchaseBtn?.addEventListener('click', () => {
      // 鍵アプリの商品情報を直接カートに追加
      const lockAppProduct = {
        id: Date.now(),
        title: '鍵の閉め忘れ防止アプリ',
        price: 100,
        image: '🔐',
        quantity: 1
      };
      
      // 既存商品チェック
      const existingProduct = this.cart.find(item => item.title === lockAppProduct.title);
      
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push(lockAppProduct);
      }
      
      // ボタンアニメーション
      const originalText = purchaseBtn.innerHTML;
      purchaseBtn.innerHTML = '<span>カートに追加済み!</span>';
      purchaseBtn.style.background = 'linear-gradient(135deg, #34C759, #30A46C)';
      
      setTimeout(() => {
        purchaseBtn.innerHTML = originalText;
        purchaseBtn.style.background = '';
      }, 2000);
      
      // カート更新
      this.updateCart();
      this.showCartAnimation();
    });
    
    tryBtn?.addEventListener('click', () => {
      // プロダクトセクションにスクロール
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // 決済処理
  checkout() {
    if (this.cart.length === 0) {
      alert('カートが空です');
      return;
    }

    // 決済処理のシミュレーション
    const checkoutBtn = document.querySelector('.checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    
    checkoutBtn.innerHTML = '<span>処理中...</span>';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
      // カートをクリア
      this.cart = [];
      this.updateCart();
      this.closeCart();
      this.showPurchaseSuccess();
      
      // ボタンを元に戻す
      checkoutBtn.innerHTML = originalText;
      checkoutBtn.disabled = false;
    }, 2000);
  }

  // 購入完了アニメーション
  showPurchaseSuccess() {
    const successModal = document.createElement('div');
    successModal.className = 'purchase-success-modal';
    successModal.innerHTML = `
      <div class="success-content">
        <div class="success-icon">✓</div>
        <h3>購入ありがとうございます！</h3>
        <p>ご注文の確認メールをお送りしました。</p>
        <button class="success-btn" onclick="this.parentElement.parentElement.remove()">
          閉じる
        </button>
      </div>
    `;
    
    document.body.appendChild(successModal);
    
    // アニメーション
    setTimeout(() => {
      successModal.classList.add('show');
    }, 100);
    
    // 自動削除
    setTimeout(() => {
      successModal.remove();
    }, 5000);
  }
}

// CSS追加 (JavaScriptで動的に追加)
const additionalStyles = `
  <style>
    .custom-cursor {
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.2s ease;
    }
    
    .cursor-hover {
      transform: scale(2);
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md);
      border-bottom: 1px solid var(--color-gray-200);
    }
    
    .cart-item-image {
      width: 60px;
      height: 60px;
      background: var(--color-gray-100);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    
    .cart-item-details {
      flex: 1;
    }
    
    .cart-item-details h4 {
      font-size: var(--font-sm);
      font-weight: 600;
      margin-bottom: var(--space-xs);
    }
    
    .cart-item-price {
      color: var(--color-primary);
      font-weight: 600;
      margin-bottom: var(--space-xs);
    }
    
    .cart-item-quantity {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    
    .quantity-btn {
      width: 24px;
      height: 24px;
      border: 1px solid var(--color-gray-300);
      background: var(--color-white);
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    
    .cart-item-remove {
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 18px;
      padding: var(--space-sm);
    }
    
    .purchase-success-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3000;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .purchase-success-modal.show {
      opacity: 1;
    }
    
    .success-content {
      background: var(--color-white);
      padding: var(--space-3xl);
      border-radius: var(--radius-xl);
      text-align: center;
      max-width: 400px;
      transform: scale(0.8);
      transition: transform 0.3s ease;
    }
    
    .purchase-success-modal.show .success-content {
      transform: scale(1);
    }
    
    .success-icon {
      width: 80px;
      height: 80px;
      background: var(--color-success);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 40px;
      margin: 0 auto var(--space-lg);
      animation: checkmark 0.6s ease;
    }
    
    @keyframes checkmark {
      0% { transform: scale(0) rotate(180deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    
    .animate-in {
      animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .splash-screen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }
    
    .splash-logo {
      color: white;
      font-size: var(--font-4xl);
      font-weight: 800;
      animation: pulse 2s infinite;
    }
  </style>
`;

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
  // 追加スタイルを注入
  document.head.insertAdjacentHTML('beforeend', additionalStyles);
  
  // アプリ初期化
  const app = new PremiumECommerceApp();
  
  // グローバルアクセス用
  window.ecommerceApp = app;
});

// パフォーマンス最適化
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}