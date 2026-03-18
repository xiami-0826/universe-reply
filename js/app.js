/**
 * 宇宙正在回复你 - 主应用逻辑
 */

// 全局状态
const state = {
    question: '',
    cards: [],
    revealedCards: 0,
    interpretation: '',
    wisdom: ''
};

// 塔罗牌数据
const tarotCards = [
    { id: 0, name: '愚者', meaning: '新的开始', number: '0' },
    { id: 1, name: '魔术师', meaning: '创造与显化', number: 'I' },
    { id: 2, name: '女祭司', meaning: '直觉与内在', number: 'II' },
    { id: 3, name: '皇后', meaning: '丰饶与滋养', number: 'III' },
    { id: 4, name: '皇帝', meaning: '权威与结构', number: 'IV' },
    { id: 5, name: '教皇', meaning: '传统与教导', number: 'V' },
    { id: 6, name: '恋人', meaning: '选择与关系', number: 'VI' },
    { id: 7, name: '战车', meaning: '意志与胜利', number: 'VII' },
    { id: 8, name: '力量', meaning: '勇气与耐心', number: 'VIII' },
    { id: 9, name: '隐者', meaning: '反思与寻求', number: 'IX' },
    { id: 10, name: '命运之轮', meaning: '变化与周期', number: 'X' },
    { id: 11, name: '正义', meaning: '平衡与真理', number: 'XI' },
    { id: 12, name: '倒吊人', meaning: '牺牲与顿悟', number: 'XII' },
    { id: 13, name: '死神', meaning: '结束与重生', number: 'XIII' },
    { id: 14, name: '节制', meaning: '和谐与中庸', number: 'XIV' },
    { id: 15, name: '恶魔', meaning: '束缚与欲望', number: 'XV' },
    { id: 16, name: '塔', meaning: '突变与觉醒', number: 'XVI' },
    { id: 17, name: '星星', meaning: '希望与灵感', number: 'XVII' },
    { id: 18, name: '月亮', meaning: '幻象与潜意识', number: 'XVIII' },
    { id: 19, name: '太阳', meaning: '快乐与成功', number: 'XIX' },
    { id: 20, name: '审判', meaning: '重生与觉醒', number: 'XX' },
    { id: 21, name: '世界', meaning: '完成与圆满', number: 'XXI' }
];

// 宇宙格言库
const wisdomQuotes = [
    '有些答案不是未来给你的，而是你早已知道的。',
    '宇宙从不直接告诉你答案，它只会给你寻找答案的勇气。',
    '当你停止寻找，答案自然会出现。',
    '每一个问题，都是通向内在的门。',
    '相信你的直觉，它比理智更接近真相。',
    '宇宙正在以你看不见的方式，回应着你的每一个念头。',
    '问题本身就是答案的一部分。',
    '有时候，不回答就是最好的回答。',
    '你所寻求的，也在寻求着你。',
    '宇宙不会给你想要的，它只会给你需要的。',
    '当你准备好时，答案就会出现。',
    '每个结局都是新的开始，每个开始都藏着答案。',
    '你的内心早已知道答案，只是需要时间来接受它。',
    '宇宙通过巧合与你对话，留意那些重复出现的信号。',
    '放下执念，答案会自然浮现。'
];

/**
 * 页面切换
 */
function goToPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    document.getElementById(pageId).classList.add('active');
    
    // 页面特定逻辑
    if (pageId === 'page-draw') {
        initDrawPage();
    } else if (pageId === 'page-interpret') {
        generateInterpretation();
    } else if (pageId === 'page-wisdom') {
        generateWisdom();
    } else if (pageId === 'page-share') {
        prepareShareCard();
    }
}

/**
 * 填充问题示例
 */
function fillQuestion(question) {
    document.getElementById('question-input').value = question;
}

/**
 * 提交问题
 */
function submitQuestion() {
    const question = document.getElementById('question-input').value.trim();
    
    if (!question) {
        alert('请先输入你的问题');
        return;
    }
    
    state.question = question;
    goToPage('page-draw');
}

/**
 * 初始化抽牌页面
 */
function initDrawPage() {
    // 重置状态
    state.revealedCards = 0;
    state.cards = [];
    
    // 随机抽取3张牌
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    state.cards = shuffled.slice(0, 3);
    
    // 重置卡牌显示
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('revealed');
    });
    
    // 更新卡牌数据
    state.cards.forEach((card, index) => {
        const cardEl = document.getElementById(`card-${index + 1}`);
        const nameEl = document.getElementById(`card-name-${index + 1}`);
        const meaningEl = document.getElementById(`card-meaning-${index + 1}`);
        
        // 更新卡牌背面的内容
        const cardBack = cardEl.querySelector('.card-back');
        cardBack.innerHTML = `
            <div class="card-content">
                <div class="card-number">${card.number}</div>
                <div class="card-name">${card.name}</div>
                <div class="card-meaning">${card.meaning}</div>
            </div>
        `;
    });
    
    // 隐藏解读按钮
    document.getElementById('btn-interpret').style.display = 'none';
}

/**
 * 翻开卡牌
 */
function revealCard(cardIndex) {
    const card = document.getElementById(`card-${cardIndex}`);
    
    if (card.classList.contains('revealed')) {
        return;
    }
    
    card.classList.add('revealed');
    state.revealedCards++;
    
    // 播放音效（可选）
    // playFlipSound();
    
    // 如果3张都翻开了，显示解读按钮
    if (state.revealedCards === 3) {
        setTimeout(() => {
            document.getElementById('btn-interpret').style.display = 'inline-block';
        }, 800);
    }
}

/**
 * 生成宇宙解读
 */
function generateInterpretation() {
    // 显示问题
    document.getElementById('display-question').textContent = state.question;
    
    // 显示小卡片
    state.cards.forEach((card, index) => {
        const miniCard = document.getElementById(`mini-card-${index + 1}`);
        miniCard.innerHTML = `
            <div>${card.number}</div>
            <div style="font-size:0.6rem;margin-top:4px;">${card.name}</div>
        `;
    });
    
    // 显示加载状态
    document.getElementById('interpret-loading').style.display = 'block';
    document.getElementById('interpret-content').style.display = 'none';
    document.getElementById('btn-wisdom').style.display = 'none';
    
    // 模拟AI生成（实际应调用API）
    setTimeout(() => {
        const interpretation = generateAIInterpretation();
        state.interpretation = interpretation;
        
        document.getElementById('interpret-text').textContent = interpretation;
        document.getElementById('interpret-loading').style.display = 'none';
        document.getElementById('interpret-content').style.display = 'block';
        document.getElementById('btn-wisdom').style.display = 'inline-block';
    }, 2000);
}

/**
 * AI解读生成（简化版）
 */
function generateAIInterpretation() {
    const cardNames = state.cards.map(c => c.name).join('、');
    const cardMeanings = state.cards.map(c => c.meaning).join('，');
    
    const templates = [
        `宇宙通过${cardNames}三张牌回应你的问题。${state.cards[0].name}代表${state.cards[0].meaning}，提示你${getAdvice(0)}；${state.cards[1].name}象征${state.cards[1].meaning}，提醒你${getAdvice(1)}；而${state.cards[2].name}则意味着${state.cards[2].meaning}，告诉你${getAdvice(2)}。整体而言，宇宙在告诉你：保持开放的心态，答案正在路上。`,
        
        `当你抽到${cardNames}时，宇宙在说：第一张牌${state.cards[0].name}显示${state.cards[0].meaning}，这是当下的能量；第二张${state.cards[1].name}指向${state.cards[1].meaning}，是需要关注的核心；第三张${state.cards[2].name}预示${state.cards[2].meaning}，是可能的发展方向。结合起来看，${getCombinedAdvice()}。`,
        
        `${cardNames}这三张牌共同编织了一个答案。${state.cards[0].name}(${state.cards[0].meaning})是你的起点，${state.cards[1].name}(${state.cards[1].meaning})是过程，${state.cards[2].name}(${state.cards[2].meaning})是结果。宇宙想告诉你：${getWisdomAdvice()}。`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * 获取单牌建议
 */
function getAdvice(index) {
    const advices = [
        '要相信直觉',
        '需要耐心等待',
        '应该主动出击',
        '保持现状就好',
        '是时候改变了',
        '听从内心声音',
        '不要被表象迷惑',
        '接受现实',
        '勇敢前行'
    ];
    return advices[index % advices.length];
}

/**
 * 获取综合建议
 */
function getCombinedAdvice() {
    return '你的问题正在向好的方向发展，保持信心';
}

/**
 * 获取智慧建议
 */
function getWisdomAdvice() {
    return '一切发生皆有利于你';
}

/**
 * 生成宇宙格言
 */
function generateWisdom() {
    // 显示加载状态
    document.getElementById('wisdom-loading').style.display = 'block';
    document.getElementById('wisdom-content').style.display = 'none';
    document.getElementById('btn-share').style.display = 'none';
    
    // 模拟AI生成
    setTimeout(() => {
        const wisdom = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
        state.wisdom = wisdom;
        
        document.getElementById('wisdom-text').textContent = wisdom;
        document.getElementById('wisdom-loading').style.display = 'none';
        document.getElementById('wisdom-content').style.display = 'block';
        document.getElementById('btn-share').style.display = 'inline-block';
    }, 1500);
}

/**
 * 准备分享卡片
 */
function prepareShareCard() {
    document.getElementById('share-question').textContent = state.question;
    document.getElementById('share-interpret').textContent = state.interpretation;
    document.getElementById('share-wisdom').textContent = state.wisdom;
}

/**
 * 下载分享卡片
 */
function downloadCard() {
    const cardElement = document.getElementById('share-card');
    
    html2canvas(cardElement, {
        backgroundColor: '#0a0a1a',
        scale: 2
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `宇宙回复-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }).catch(err => {
        console.error('生成图片失败:', err);
        alert('图片生成失败，请重试');
    });
}

/**
 * 初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ 宇宙正在回复你 - 已加载');
});
