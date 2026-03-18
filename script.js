/**
 * 宇宙正在回复你 - 叙事型占卜解读引擎 V2.0
 * 智能占卜系统 - 每次解读都是独特的故事
 */

// 全局状态
const state = {
    mode: 'general',
    question: '',
    personName: '',
    cards: [],
    revealedCards: 0,
    interpretation: '',
    wisdom: '',
    answerId: '',
    energy: '',
    questionType: ''
};

// ==================== 塔罗牌数据 ====================
const tarotCards = [
    { id: 0, name: 'The Fool', nameCN: '愚人', keywords: ['新的开始', '冒险', '纯真', '信任'] },
    { id: 1, name: 'The Magician', nameCN: '魔术师', keywords: ['创造', '显化', '能力', '行动'] },
    { id: 2, name: 'The High Priestess', nameCN: '女祭司', keywords: ['直觉', '内在', '神秘', '等待'] },
    { id: 3, name: 'The Empress', nameCN: '皇后', keywords: ['丰饶', '滋养', '创造力', '母爱'] },
    { id: 4, name: 'The Emperor', nameCN: '皇帝', keywords: ['权威', '结构', '稳定', '掌控'] },
    { id: 5, name: 'The Lovers', nameCN: '恋人', keywords: ['选择', '关系', '和谐', '价值观'] },
    { id: 6, name: 'The Chariot', nameCN: '战车', keywords: ['意志', '胜利', '前进', '控制'] },
    { id: 7, name: 'Strength', nameCN: '力量', keywords: ['勇气', '耐心', '内在力量', '温柔'] },
    { id: 8, name: 'The Hermit', nameCN: '隐者', keywords: ['反思', '独处', '寻求', '指引'] },
    { id: 9, name: 'Wheel of Fortune', nameCN: '命运之轮', keywords: ['变化', '命运', '周期', '转折'] },
    { id: 10, name: 'Justice', nameCN: '正义', keywords: ['平衡', '真理', '因果', '公正'] },
    { id: 11, name: 'The Hanged Man', nameCN: '倒吊人', keywords: ['牺牲', '顺应', '暂停', '新视角'] },
    { id: 12, name: 'Death', nameCN: '死神', keywords: ['结束', '重生', '转变', '放手'] },
    { id: 13, name: 'Temperance', nameCN: '节制', keywords: ['和谐', '中庸', '平衡', '耐心'] },
    { id: 14, name: 'The Devil', nameCN: '恶魔', keywords: ['束缚', '欲望', '依赖', '阴影'] },
    { id: 15, name: 'The Tower', nameCN: '塔', keywords: ['突变', '觉醒', '颠覆', '真相'] },
    { id: 16, name: 'The Star', nameCN: '星星', keywords: ['希望', '灵感', '宁静', '指引'] },
    { id: 17, name: 'The Moon', nameCN: '月亮', keywords: ['迷茫', '潜意识', '幻象', '情绪'] },
    { id: 18, name: 'The Sun', nameCN: '太阳', keywords: ['积极', '光明', '成功', '喜悦'] },
    { id: 19, name: 'Judgement', nameCN: '审判', keywords: ['重生', '觉醒', '召唤', '宽恕'] },
    { id: 20, name: 'The World', nameCN: '世界', keywords: ['完成', '圆满', '成就', '整合'] }
];

// 宇宙能量标签
const energyLabels = [
    '温柔靠近', '命运转折', '新的开始', '情绪迷雾', '缓慢变化', '等待时刻',
    '隐藏连结', '内心觉醒', '即将相遇', '沉默酝酿', '未知旅程', '时间考验'
];

// 宇宙格言库
const universeQuotes = [
    '真正属于你的东西，从不需要你拼命抓住。',
    '当你停止追问，命运才开始回答。',
    '时间不会改变一切，但它会让答案浮现。',
    '有些答案，不是未来给你的，而是你已经知道的。',
    '你不必急着知道结局，生活正在慢慢揭晓。',
    '宇宙从不直接告诉你答案，它只会给你寻找答案的勇气。',
    '每一个问题，都是通向内在的门。',
    '相信你的直觉，它比理智更接近真相。',
    '当你准备好时，答案就会出现。',
    '你所寻求的，也在寻求着你。',
    '有些相遇不是突然发生，只是你终于走到了那里。',
    '在不确定中，藏着无限的可能。',
    '有时候，不回答就是最好的回答。',
    '答案不在远方，就在你凝视的此刻。',
    '宇宙用沉默回应嘈杂，用显现回应等待。',
    '你的心早已知道，只是需要勇气去看见。',
    '生命在用最合适的方式，推动你成长。',
    '接纳当下的全部，包括那些不确定的部分。',
    '光明和阴影，都是完整的你的一部分。',
    '当你停止寻找，答案自然会出现。',
    '命运不会辜负你，它只会在你准备好时出现。',
    '有些答案像潮水，不是你呼唤它时出现，而是它自己涨上潮来。',
    '命运有时候不是一扇门，而是一条慢慢显现的路。'
];

// 每日格言初始化
function initDailyQuote() {
    const quoteText = document.getElementById('daily-wisdom-text');
    if (quoteText) {
        const today = new Date();
        const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const dailyQuotes = [
            '命运不会辜负你，\n它只会在你准备好时出现。',
            '真正属于你的东西，\n从不需要你拼命抓住。',
            '当你停止追问，\n命运才开始回答。',
            '时间不会改变一切，\n但它会让答案浮现。',
            '有些答案，\n不是未来给你的，\n而是你已经知道的。',
            '你不必急着知道结局，\n生活正在慢慢揭晓。',
            '宇宙从不直接告诉你答案，\n它只会给你寻找答案的勇气。',
            '每一个问题，\n都是通向内在的门。',
            '相信你的直觉，\n它比理智更接近真相。',
            '当你准备好时，\n答案就会出现。',
            '你所寻求的，\n也在寻求着你。',
            '有些相遇不是突然发生，\n只是你终于走到了那里。',
            '在不确定中，\n藏着无限的可能。',
            '有时候，\n不回答就是最好的回答。',
            '答案不在远方，\n就在你凝视的此刻。',
            '宇宙用沉默回应嘈杂，\n用显现回应等待。',
            '你的心早已知道，\n只是需要勇气去看见。',
            '生命在用最合适的方式，\n推动你成长。',
            '接纳当下的全部，\n包括那些不确定的部分。',
            '光明和阴影，\n都是完整的你的一部分。',
            '当你停止寻找，\n答案自然会出现。'
        ];
        const randomIndex = dateSeed % dailyQuotes.length;
        quoteText.innerHTML = dailyQuotes[randomIndex].replace(/\n/g, '<br>');
    }
}

// 生成答案编号
function generateAnswerId() {
    return Math.floor(1000 + Math.random() * 9000);
}

// 选择能量标签
function selectEnergyLabel() {
    return energyLabels[Math.floor(Math.random() * energyLabels.length)];
}

// 检测问题类型
function detectQuestionType(question) {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('他') || lowerQ.includes('她') || lowerQ.includes('感情') || 
        lowerQ.includes('喜欢') || lowerQ.includes('爱') || lowerQ.includes('复合') ||
        lowerQ.includes('想我') || lowerQ.includes('我们') || lowerQ.includes('前任')) {
        return '情感';
    } else if (lowerQ.includes('工作') || lowerQ.includes('事业') || lowerQ.includes('机会') ||
               lowerQ.includes('升职') || lowerQ.includes('跳槽') || lowerQ.includes('面试') ||
               lowerQ.includes('创业') || lowerQ.includes('合作')) {
        return '事业';
    }
    return '运势';
}

// 页面交互函数
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    if (pageId === 'page-draw') {
        initDrawPage();
    } else if (pageId === 'page-interpret') {
        displayInterpretation();
    } else if (pageId === 'page-wisdom') {
        displayWisdom();
    } else if (pageId === 'page-share') {
        prepareShareCard();
    }
}

function selectMode(mode) {
    state.mode = mode;
    if (mode === 'general') {
        goToPage('page-input');
    } else {
        goToPage('page-relationship-input');
    }
}

function fillQuestion(question) {
    const input = document.getElementById('question-input');
    if (input) input.value = question;
}

function fillPersonName(name) {
    const input = document.getElementById('person-name-input');
    if (input) input.value = name;
}

function submitQuestion() {
    const input = document.getElementById('question-input');
    const question = input ? input.value.trim() : '';
    if (!question) {
        alert('请先输入你的问题');
        return;
    }
    state.question = question;
    goToPage('page-draw');
}

function submitRelationship() {
    const input = document.getElementById('person-name-input');
    const name = input ? input.value.trim() : '';
    if (!name) {
        alert('请输入一个人的名字');
        return;
    }
    state.personName = name;
    state.question = `关于${name}的关系`;
    goToPage('page-draw');
}

function initDrawPage() {
    state.revealedCards = 0;
    state.cards = [];
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    state.cards = shuffled.slice(0, 3);
    
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('revealed');
    });
    
    state.cards.forEach((card, index) => {
        const cardEl = document.getElementById(`card-${index + 1}`);
        const cardBack = cardEl ? cardEl.querySelector('.card-back') : null;
        if (cardBack) {
            cardBack.innerHTML = `
                <div class="card-content">
                    <div class="card-number">${card.nameCN}</div>
                    <div class="card-name">${card.name}</div>
                    <div class="card-meaning">${card.keywords[0]}</div>
                </div>
            `;
        }
    });
    
    const btnInterpret = document.getElementById('btn-interpret');
    if (btnInterpret) btnInterpret.style.display = 'none';
}

function revealCard(cardIndex) {
    const card = document.getElementById(`card-${cardIndex}`);
    if (!card || card.classList.contains('revealed')) return;
    
    card.classList.add('revealed');
    state.revealedCards++;
    
    if (state.revealedCards === 3) {
        setTimeout(() => {
            const btn = document.getElementById('btn-interpret');
            if (btn) btn.style.display = 'inline-block';
        }, 700);
    }
}

// 生成解读文本
function generateInterpretation() {
    state.answerId = generateAnswerId();
    state.energy = selectEnergyLabel();
    state.questionType = detectQuestionType(state.question);
    
    let interpretation = `宇宙答案 #${state.answerId}\n\n`;
    interpretation += `宇宙能量\n${state.energy}\n\n`;
    
    // 简单的解读生成
    const [card1, card2, card3] = state.cards;
    interpretation += `第一张牌「${card1.nameCN}」：${card1.keywords.join('、')}\n`;
    interpretation += `此刻的状态充满着${card1.keywords[0]}的能量。\n\n`;
    
    interpretation += `第二张牌「${card2.nameCN}」：${card2.keywords.join('、')}\n`;
    interpretation += `隐藏的因素与${card2.keywords[0]}相关。\n\n`;
    
    interpretation += `第三张牌「${card3.nameCN}」：${card3.keywords.join('、')}\n`;
    interpretation += `未来的趋势指向${card3.keywords[0]}。\n\n`;
    
    interpretation += '宇宙想对你说：\n';
    interpretation += universeQuotes[Math.floor(Math.random() * universeQuotes.length)];
    
    state.interpretation = interpretation;
    state.wisdom = universeQuotes[Math.floor(Math.random() * universeQuotes.length)];
    
    return interpretation;
}

function displayInterpretation() {
    const displayQuestion = document.getElementById('display-question');
    if (displayQuestion) displayQuestion.textContent = state.question;
    
    // 显示小卡牌
    state.cards.forEach((card, index) => {
        const miniCard = document.getElementById(`mini-card-${index + 1}`);
        const labels = ['第一张', '第二张', '第三张'];
        if (miniCard) {
            miniCard.innerHTML = `
                <div style="font-size:0.55rem;color:rgba(157,123,255,0.8);margin-bottom:2px;">${labels[index]}</div>
                <div style="font-size:0.65rem;font-weight:bold;">${card.nameCN}</div>
                <div style="font-size:0.5rem;margin-top:2px;opacity:0.7;">${card.keywords[0]}</div>
            `;
        }
    });
    
    // 显示加载
    const loadingEl = document.getElementById('interpret-loading');
    const contentEl = document.getElementById('interpret-content');
    const btnWisdom = document.getElementById('btn-wisdom');
    const answerIdEl = document.getElementById('answer-id');
    
    if (loadingEl) loadingEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
    if (btnWisdom) btnWisdom.style.display = 'none';
    if (answerIdEl) answerIdEl.style.display = 'none';
    
    // 1.5秒后生成解读
    setTimeout(() => {
        const interpretation = generateInterpretation();
        const interpretText = document.getElementById('interpret-text');
        if (interpretText) interpretText.textContent = interpretation;
        
        if (answerIdEl) {
            answerIdEl.textContent = `宇宙答案 #${state.answerId}`;
            answerIdEl.style.display = 'block';
        }
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'block';
        if (btnWisdom) btnWisdom.style.display = 'inline-block';
        
        const btnGenerateCard = document.getElementById('btn-generate-card');
        if (btnGenerateCard) btnGenerateCard.style.display = 'inline-block';
    }, 1500);
}

// 简短总结
const shortSummaries = {
    'The Fool': '新的旅程即将开启，保持初心与勇气',
    'The Magician': '你拥有实现愿望的所有资源',
    'The High Priestess': '答案在你的内心深处，倾听直觉',
    'The Empress': '丰饶的能量正在流向你',
    'The Emperor': '建立稳固的基础，保持理性',
    'The Lovers': '一个重要的选择或关系浮现',
    'The Chariot': '通过意志力克服困难，勇往直前',
    'Strength': '真正的力量来自内在的平静',
    'The Hermit': '需要独处反思，寻找内在的光',
    'Wheel of Fortune': '变化正在发生，顺应时机',
    'Justice': '因果法则运作，保持诚实',
    'The Hanged Man': '换个角度看问题，放下控制',
    'Death': '旧的周期结束，新生即将开始',
    'Temperance': '寻找平衡与和谐之道',
    'The Devil': '看见束缚，你有力量解开锁链',
    'The Tower': '突然的变化带来觉醒',
    'The Star': '希望之光照亮前路',
    'The Moon': '穿越迷雾，跟随直觉',
    'The Sun': '光明和成功的能量充满你',
    'Judgement': '觉醒的时刻，回应内心的召唤',
    'The World': '一个完整的周期即将圆满完成'
};

function displayWisdom() {
    console.log('显示宇宙格言页面', state.wisdom);
    
    setTimeout(() => {
        const loadingEl = document.getElementById('wisdom-loading');
        const contentEl = document.getElementById('wisdom-content');
        const textEl = document.getElementById('wisdom-text');
        const btnEl = document.getElementById('btn-share');
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'block';
        if (btnEl) btnEl.style.display = 'inline-block';
        
        if (textEl) {
            textEl.textContent = state.wisdom || '相信你的直觉，它比理智更接近真相。';
        }
    }, 100);
}

function prepareShareCard() {
    const shareQuestion = document.getElementById('share-question');
    const shareInterpret = document.getElementById('share-interpret');
    const shareWisdom = document.getElementById('share-wisdom');
    
    if (shareQuestion) shareQuestion.textContent = state.question;
    
    // 生成简短总结
    const [card1, card2, card3] = state.cards;
    let summary = '';
    if (shortSummaries[card1.name]) summary += `【第一张】${shortSummaries[card1.name]}\n`;
    if (shortSummaries[card2.name]) summary += `【第二张】${shortSummaries[card2.name]}\n`;
    if (shortSummaries[card3.name]) summary += `【第三张】${shortSummaries[card3.name]}`;
    
    if (shareInterpret) shareInterpret.textContent = summary;
    if (shareWisdom) shareWisdom.textContent = state.wisdom;
}

function generateShortSummary() {
    const [card1, card2, card3] = state.cards;
    let summary = '';
    if (shortSummaries[card1.name]) summary += `【第一张】${shortSummaries[card1.name]}\n`;
    if (shortSummaries[card2.name]) summary += `【第二张】${shortSummaries[card2.name]}\n`;
    if (shortSummaries[card3.name]) summary += `【第三张】${shortSummaries[card3.name]}`;
    return summary;
}

// 生成宇宙卡片
function generateCosmicCard() {
    // 创建卡片容器
    const cardContainer = document.createElement('div');
    cardContainer.style.cssText = `
        width: 1080px;
        height: 1920px;
        background: linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%);
        position: fixed;
        left: -9999px;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        overflow: hidden;
    `;
    
    // 添加星空背景
    const starsOverlay = document.createElement('div');
    starsOverlay.style.cssText = `
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: 
            radial-gradient(2px 2px at 100px 200px, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 300px 400px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 500px 100px, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 700px 600px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 900px 300px, rgba(255,255,255,0.7), transparent);
        background-size: 1000px 800px;
        opacity: 0.6;
        pointer-events: none;
    `;
    cardContainer.appendChild(starsOverlay);
    
    // 卡片内容
    const cardContent = document.createElement('div');
    cardContent.style.cssText = `
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;
        max-width: 900px;
    `;
    
    // 标题
    const title = document.createElement('h1');
    title.textContent = '宇宙正在回复你';
    title.style.cssText = `
        font-size: 72px;
        font-weight: 300;
        letter-spacing: 0.15em;
        margin-bottom: 20px;
        color: #fff;
        text-shadow: 0 0 40px rgba(157, 123, 255, 0.5);
    `;
    cardContent.appendChild(title);
    
    // 宇宙答案编号
    const answerId = document.createElement('div');
    answerId.textContent = `宇宙答案 #${state.answerId}`;
    answerId.style.cssText = `
        font-size: 36px;
        color: rgba(157, 123, 255, 0.9);
        letter-spacing: 0.1em;
        margin-bottom: 60px;
    `;
    cardContent.appendChild(answerId);
    
    // 宇宙能量
    const energy = document.createElement('div');
    energy.innerHTML = `<span style="color: rgba(255,255,255,0.6); font-size: 28px;">宇宙能量</span><br><span style="font-size: 42px; color: #fff; margin-top: 10px; display: inline-block;">${state.energy}</span>`;
    energy.style.cssText = `margin-bottom: 50px; line-height: 1.6;`;
    cardContent.appendChild(energy);
    
    // 问题
    const question = document.createElement('div');
    question.innerHTML = `<span style="color: rgba(255,255,255,0.5); font-size: 24px;">你的问题</span><br><span style="font-size: 32px; color: #fff; margin-top: 10px; display: inline-block;">${state.question}</span>`;
    question.style.cssText = `
        margin-bottom: 50px;
        padding: 30px 40px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        border-left: 4px solid rgba(157, 123, 255, 0.5);
        line-height: 1.6;
    `;
    cardContent.appendChild(question);
    
    // 三张牌
    const cardsDiv = document.createElement('div');
    cardsDiv.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-bottom: 50px;
    `;
    state.cards.forEach((card, index) => {
        const cardBox = document.createElement('div');
        cardBox.style.cssText = `
            width: 220px;
            height: 340px;
            background: linear-gradient(145deg, rgba(40, 35, 80, 0.9) 0%, rgba(25, 22, 55, 0.9) 100%);
            border: 2px solid rgba(157, 123, 255, 0.4);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        `;
        cardBox.innerHTML = `
            <div style="font-size: 24px; color: rgba(157, 123, 255, 0.8); margin-bottom: 20px;">第${['一', '二', '三'][index]}张</div>
            <div style="font-size: 42px; color: #fff; font-weight: bold; margin-bottom: 15px;">${card.nameCN}</div>
            <div style="font-size: 28px; color: rgba(255, 255, 255, 0.7);">${card.keywords[0]}</div>
        `;
        cardsDiv.appendChild(cardBox);
    });
    cardContent.appendChild(cardsDiv);
    
    // 今日宇宙格言
    const wisdom = document.createElement('div');
    wisdom.innerHTML = `<span style="color: rgba(157, 123, 255, 0.8); font-size: 28px;">今日宇宙格言</span><br><span style="font-size: 36px; color: #fff; margin-top: 20px; display: inline-block; font-style: italic; line-height: 1.6;">${state.wisdom}</span>`;
    wisdom.style.cssText = `
        margin-top: 40px;
        padding: 40px;
        background: linear-gradient(135deg, rgba(157, 123, 255, 0.1) 0%, rgba(157, 123, 255, 0.05) 100%);
        border-radius: 20px;
        border: 1px solid rgba(157, 123, 255, 0.3);
        line-height: 1.6;
    `;
    cardContent.appendChild(wisdom);
    
    // 底部文字
    const footer = document.createElement('div');
    footer.textContent = '扫码体验宇宙占卜';
    footer.style.cssText = `
        margin-top: 60px;
        font-size: 24px;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 0.1em;
    `;
    cardContent.appendChild(footer);
    
    cardContainer.appendChild(cardContent);
    document.body.appendChild(cardContainer);
    
    // 生成图片
    if (typeof html2canvas !== 'undefined') {
        html2canvas(cardContainer, {
            backgroundColor: '#0a0a1a',
            scale: 1,
            width: 1080,
            height: 1920
        }).then(canvas => {
            // 下载图片
            const link = document.createElement('a');
            link.download = `宇宙答案-${state.answerId}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // 移除临时元素
            document.body.removeChild(cardContainer);
            
            // 显示分享提示
            alert('✨ 宇宙卡片已生成！\n\n很多人会分享这张卡片到朋友圈。');
        }).catch(err => {
            console.error('生成卡片失败:', err);
            document.body.removeChild(cardContainer);
            alert('卡片生成失败，请重试');
        });
    } else {
        document.body.removeChild(cardContainer);
        alert('图片生成库未加载，请刷新页面后重试');
    }
}

function downloadCard() {
    const cardElement = document.getElementById('share-card');
    if (!cardElement || typeof html2canvas === 'undefined') {
        alert('图片生成失败，请重试');
        return;
    }
    
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

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ 宇宙正在回复你 - 叙事型占卜解读引擎 V2.0 已加载');
    initDailyQuote();
});
