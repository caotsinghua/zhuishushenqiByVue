<template>
    <div class="book" key="book">
        <my-header>
            <p class="title">{{chapterTitle}}</p>
        </my-header>
        <main>
            <content class="content">
                <div class="content-body" v-html="bookContent.body"></div>
            </content>
        </main>
        <div class="catalog-wrap">
            <ul class="catalog" :class="{'modal-hidden':modalHidden}">
                <li class="category" v-for="(chapter,index) in chapters" :key="index"><a href="javascript:;" @click="getContent(index+1)">{{chapter.title}}</a></li>
            </ul>
        </div>
        <div class="modal" :class="{'modal-hidden':modalHidden}" @click.stop="closeCatalog()"></div>
        <footer>
            <div class="footer-bar">
                <a href="javascript:;" class="footer-btn"><i class="el-icon-star-on"></i><span>夜间模式</span></a>
                <a href="javascript:;" class="footer-btn" @click.prevent.stop="preChapter()"><i class="el-icon-arrow-left"></i><span>上一章</span></a>
                <a href="javascript:;" class="footer-btn" @click.prevent.stop="nextChapter()"><i class="el-icon-arrow-right"></i><span>下一章</span></a>
                <a href="javascript:;" class="footer-btn" @click.prevent.stop="openCatalog()"><i class="el-icon-menu"></i><span>目录</span></a>
            </div>
        </footer>
    </div>
</template>

<script>
    import apis from '../store/apis.js'
    import header from '../components/header.vue'
    const getChaptersQuery = "?view=chapters";
    export default {
        data() {
            return {
                chapters: [],
                bookContent: {
                    title: '',
                    body: ''
                },
                chapterNum: 1,
                chapterTitle: '',
                modalHidden: true
            }
        },
        created() {
            this.getChapters();
        },
        components: {
            'my-header': header
        },
        methods: {
            getChapters() { //获取所有章节
                let id = this.$route.params.id;
                console.log(apis.bird + apis.getChapters + id + getChaptersQuery)
                this.$http.get(apis.bird + apis.getChapters + id + getChaptersQuery).then(res => {
                    this.chapters = res.data.mixToc.chapters;
                    this.getContent(this.chapterNum); //默认获取第一章
                }).catch(err => {
                    console.log(err);
                })
            },
            getContent(num) { //获取指定章节内容
                let index = num - 1;
                this.chapterNum = num;
                let chapter = this.chapters[index];
                this.chapterTitle = chapter.title;
                this.$http.get(apis.bird + apis.getChapterContent + chapter.link).then(res => {
                    
                    if (res.data.chapter) {
                        this.bookContent = res.data.chapter;
                        this.bookContent.body = this.bookContent.body.replace(/\n/g, "<br>");
                    } else {
                        this.bookContent.body = "当前为vip章节,请换源观看"
                    }
    
                }).catch(err => {
                    console.log(err);
                })
    
            },
            nextChapter() { //下一章
                if (this.chapterNum <= this.chapters.length) {
                    this.getContent(this.chapterNum + 1);
                    this.closeCatalog();
                } else {
                    this.bookContent.title = "没有更多章节";
                    return;
                }
            },
            preChapter() { //上一章
                if (this.chapterNum >= 2) {
    
                    this.getContent(this.chapterNum - 1);
                    this.closeCatalog();
                } else {
                    this.bookContent.title = "已经是第一章了";
                    return;
                }
            },
            openCatalog() {
                this.modalHidden = false;
            },
            closeCatalog() {
                this.modalHidden = true;
            }
        }
    }
</script>

<style lang="less" scoped>
    @fontColor: #000;
    @bookBgColor: #fff;
    @fontColor_night: #ccc;
    @bookBgColo_nightr: #000;
    @mainColor: #20a0ff;
    .book{
        padding-top:2.5rem;
    }
    .content {
        display: block;
        box-sizing: border-box;
        padding: 1rem;
        transition: .3s;
        .content-title {
            font-size: 1.1rem;
        }
        .content-body {
            line-height: 1.3rem;
            transition: .3s;
        }
    }
    
    .footer-bar {
        width: 100%;
        display: flex;
        position: fixed;
        bottom: 0;
        background: @mainColor;
        align-items: center;
        .footer-btn {
            flex: 1;
            display: flex;
            text-align: center;
            flex-direction: column;
            justify-content: center;
            height: 2.6rem;
            border-top: 1px solid #ccc;
            color: #fff;
            i {
                line-height: 1.3rem;
            }
            span {
                line-height: 1.3rem;
                font-size: 0.5rem;
            }
        }
    }
    
    .modal {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
        z-index: 99;
    }
    
    .catalog {
        position: fixed;
        z-index: 1000;
        width: 80%;
        height: 80%;
        left: 10%;
        top: 10%;
        background: #fff;
        overflow: auto;
        padding: 2rem 1rem;
        box-sizing: border-box;
        .category {
            font-size: 0.8rem;
            height: 2rem;
            line-height: 2rem;
            border-top: 1px solid #eee;
            a {
                display: block;
                width: 100%;
            }
        }
    }
    
    .modal-hidden {
        display: none;
    }
</style>