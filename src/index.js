class Site {
    constructor() {
        this.boards = [];
    };
    addBoard(newBoard) {
        const isExistingBoard = this.boards.find(board => board.name === newBoard.name);
        if(isExistingBoard) { throw new Error('이미 존재하는 게시판입니다.') };
        this.boards = [...this.boards, newBoard];
        newBoard.isAdded = true;
    };
    findBoardByName(boardName) {
        const foundBoard = this.boards.find(board => board.name === boardName);
        if(!foundBoard) { throw new Error('찾고자 하는 게시판이 존재하지 않습니다.'); };
        return foundBoard;
    };
};

class Board {
    constructor(name) {
        if(!name) { throw new Error('Board의 이름은 빈 값이 될 수 없습니다.'); };
        this.name = name;
        this.isAdded = false;
        this.articles = [];
    };

    publish(newArticle) {
        if(this.isAdded === false) { throw new Error('site에 추가되지 않은 게시판은 이용할 수 없습니다.'); };
        // id 형식 ${board.name}-${랜덤 값} 이지만 최근 id 가져와서 + 1하는 것으로 했음.
        // 날짜 형식 YYYY-MM-DDTHH:MM:SS.mmmZ, mmm은 millisecond 단위
        // const id = `${this.name}-${Math.floor(Math.random() * 1001)}`;
        let id = 1;
        if(this.articles.length !== 0) {
            id = [...this.articles]
                .sort((a, b) => b.id.split('-')[1] - a.id.split('-')[1])
                [0].id.split('-')[1] * 1 + 1;
        }
        const date = new Date();

        newArticle.id = `${this.name}-${id}`;
        newArticle.createdDate = date.toISOString();
        this.articles = [...this.articles, newArticle];
    };
    getAllArticles() {
        return this.articles
    };
};

class Article {
    constructor(article) {
        if(!article.subject || !article.content || !article.author) {
            throw new Error('Article에는 빈 값이 있으면 안됩니다.')
        }
        this.subject = article.subject;
        this.content = article.content;
        this.author = article.author;
    };
};

class Comment {};

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};