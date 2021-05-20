const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

// 通过fs读取静态页面
function renderPage(pagePath) {
    return new Promise((resolve, reject)=> {
        fs.readFile(pagePath, 'binary', (err, data)=> {
            if (err) reject(err);
            resolve(data);
        })
    });
}

app.use(async (ctx)=> {
    // request 下的url对应了资源路径
    const path = ctx.request.url;
    let view = 'views/404.html';

    switch (path) {
        case '/':
            view = 'views/index.html';
            break;
        default :
            break;
    }
    // 根据不同路径读取不同html
    ctx.body = await renderPage(view);
})

app.listen(3000, ()=> {
    console.log('[demo] koa2 is running at http://localhost:3000');
});

