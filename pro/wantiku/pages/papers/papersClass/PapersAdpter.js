function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var s = t[a];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, a, s) {
        return a && e(t.prototype, a), s && e(t, s), t;
    };
}(), a = require("../../../utils/util.js"), s = getApp(), i = function() {
    function i(t, a) {
        var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        e(this, i), console.log(t), this.dataBaseInfo = t, this.bufferData = 10, this.examType = a, 
        this.papersType = s, this.initPapersInfoList();
    }
    return t(i, [ {
        key: "initPapersInfoList",
        value: function() {
            this.examType == s.globalData.ExamType.fastTest ? this.parseFastIntelligentData() : this.examType == s.globalData.ExamType.zhentiTest || this.examType == s.globalData.ExamType.burningTest || this.examType == s.globalData.ExamType.fineTest || this.examType == s.globalData.ExamType.denseTest || this.examType == s.globalData.ExamType.mockTest ? this.parsePapersData() : this.examType == s.globalData.ExamType.chapterTest || this.examType == s.globalData.ExamType.highFreTest ? this.parseSpecialExerciseData() : this.examType == s.globalData.ExamType.wrongSee ? this.parseWrongSeeData() : this.examType == s.globalData.ExamType.collectionSee ? this.parseFavorSeeData() : this.examType == s.globalData.ExamType.fenxiangTest ? this.parseFenxiangSeeData() : this.examType == s.globalData.ExamType.solidifyTest ? this.parsePapersData() : this.examType == s.globalData.ExamType.textbookTest && this.parseSpecialExerciseData(), 
            0 != this.PapersInfoList.length && (0 == this.papersType ? this.PapersInfoList.push(this.strucExplainPaperInfo(this.examType)) : this.examType == s.globalData.ExamType.fastTest || this.examType == s.globalData.ExamType.highFreTest || this.examType == s.globalData.ExamType.chapterTest || this.examType == s.globalData.ExamType.textbookTest ? this.PapersInfoList.push(this.strucExplainPaperInfo(this.examType)) : this.examType != s.globalData.ExamType.wrongSee && this.examType != s.globalData.ExamType.collectionSee || this.PapersInfoList.push(this.strucExplainPaperInfo(this.examType)));
        }
    }, {
        key: "initMockPapersData",
        value: function(e) {
            if (s.globalData.MockPaperCache.mockAnswerList && s.globalData.MockPaperCache.mockAnswerList.length == this.PapersInfoList.length && e == s.globalData.MockPaperCache.mockId) {
                console.log("符合条件");
                for (var t in s.globalData.MockPaperCache.mockAnswerList) {
                    var a = this.PapersInfoList[t], i = s.globalData.MockPaperCache.mockAnswerList[t];
                    if (!i.isExplain) {
                        if (a.RealQuestionId != i.RealQuestionId) return;
                        a.QuestionContentKeyValue = i.QuestionContentKeyValue;
                    }
                }
            } else console.log("不符合条件");
        }
    }, {
        key: "checkQustionId",
        value: function(e) {
            if (0 == e) return 0;
            for (var t in this.PapersInfoList) if (e == this.PapersInfoList[t].RealQuestionId) return e;
            return 0;
        }
    }, {
        key: "strucExplainPaperInfo",
        value: function(e) {
            var t = {};
            return t.isLastItem = !0, t.isExplain = !0, t.RealQuestionId = "b", t.examType = e, 
            t;
        }
    }, {
        key: "parseFenxiangSeeData",
        value: function() {
            this.PapersInfoList = this.dataBaseInfo.SiteQuestionsEntityList, this.OrderNumber = this.dataBaseInfo.PaperEntity.QuestionsCount, 
            this.PaperName = this.dataBaseInfo.PaperEntity.PaperName, this.PaperId = this.dataBaseInfo.PaperEntity.PaperId;
            var e = this.dataBaseInfo.SiteContextQuestionsEntityList;
            this.parserMaterialEntityList(e);
        }
    }, {
        key: "parseFavorSeeData",
        value: function() {
            this.PapersInfoList = this.dataBaseInfo.SiteQuestionsEntityList, this.OrderNumber = this.dataBaseInfo.PaperEntity.QuestionsCount, 
            this.PaperName = this.dataBaseInfo.PaperEntity.PaperName, this.PaperId = this.dataBaseInfo.PaperEntity.PaperId;
            var e = this.dataBaseInfo.SiteContextQuestionsEntityList;
            this.parserMaterialEntityList(e);
        }
    }, {
        key: "parseWrongSeeData",
        value: function() {
            this.PapersInfoList = this.dataBaseInfo.SiteQuestionsEntityList, this.OrderNumber = this.dataBaseInfo.PaperEntity.QuestionsCount, 
            this.PaperName = this.dataBaseInfo.PaperEntity.PaperName, this.PaperId = this.dataBaseInfo.PaperEntity.PaperId;
            var e = this.dataBaseInfo.SiteContextQuestionsEntityList;
            this.parserMaterialEntityList(e);
        }
    }, {
        key: "parseSpecialExerciseData",
        value: function() {
            console.log(this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList[0]), this.PapersInfoList = this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList[0].QuestionsEntityList, 
            this.OrderNumber = this.dataBaseInfo.PaperEntity.QuestionsCount, this.PaperName = this.dataBaseInfo.PaperEntity.PaperName, 
            this.PaperId = this.dataBaseInfo.PaperEntity.PaperId;
            var e = this.dataBaseInfo.PaperEntity.TKContextQuestionsEntityList;
            this.parserMaterialEntityList(e);
        }
    }, {
        key: "parseFastIntelligentData",
        value: function() {
            this.PapersInfoList = this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList[0].QuestionsEntityList, 
            this.OrderNumber = this.dataBaseInfo.PaperEntity.QuestionsCount, this.PaperName = this.dataBaseInfo.PaperEntity.PaperName, 
            this.PaperId = this.dataBaseInfo.PaperEntity.PaperId;
            var e = this.dataBaseInfo.PaperEntity.TKContextQuestionsEntityList;
            this.parserMaterialEntityList(e);
        }
    }, {
        key: "parsePapersData",
        value: function() {
            var e = [];
            for (var t in this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList) {
                var a = this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList[t], s = a.QuestionsEntityList;
                if (0 == this.papersType) {
                    var i = {};
                    i.isExplain = !0, i.RealQuestionId = "a" + t, i.QuestionTitle = a.QuestionTitle, 
                    i.QuestionDescription = a.QuestionDescription, i.QuestionTypeId = a.QuestionTypeId, 
                    e.push(i);
                }
                e = e.concat(s);
            }
            this.PapersInfoList = e, this.OrderNumber = this.dataBaseInfo.PaperEntity.QuestionsCount, 
            console.log(this.OrderNumber, "------"), this.PaperId = this.dataBaseInfo.PaperEntity.PaperId;
            var n = this.dataBaseInfo.PaperEntity.TKContextQuestionsEntityList;
            this.parserMaterialEntityList(n);
        }
    }, {
        key: "parserMaterialEntityList",
        value: function(e) {
            var t = {};
            for (var a in e) {
                var s = e[a], i = {};
                i.FormatContent = s.FormatContent, i.FormatImages = s.FormatImages, i.MoveTop = 150, 
                t[s.ContextId] = i;
            }
            this.materialEntityList = t;
        }
    }, {
        key: "getPaperAnalysisCartList",
        value: function() {
            if (this.examType != s.globalData.ExamType.zhentiTest && this.examType != s.globalData.ExamType.solidifyTest && this.examType != s.globalData.ExamType.burningTest && this.examType != s.globalData.ExamType.fineTest && this.examType != s.globalData.ExamType.denseTest) return this.PapersInfoList;
            var e = [];
            for (var t in this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList) {
                var a = this.dataBaseInfo.PaperEntity.TKQuestionsBasicEntityList[t], i = a.QuestionsEntityList, n = {};
                n.isExplain = !0, n.RealQuestionId = "a" + t, n.QuestionTitle = a.QuestionTitle, 
                n.QuestionDescription = a.QuestionDescription, n.QuestionTypeId = a.QuestionTypeId, 
                e.push(n), e = e.concat(i);
            }
            return e;
        }
    }, {
        key: "getLastQuestionState",
        value: function(e) {
            return e.RealQuestionId == this.PapersInfoList[this.PapersInfoList.length - 1].RealQuestionId;
        }
    }, {
        key: "getPaperTotallength",
        value: function() {
            return this.PapersInfoList.length;
        }
    }, {
        key: "getPapersListPostion",
        value: function(e, t, a) {
            var s = this.getPaperInfoPostionById(e);
            a || (a = 3);
            var i = [], n = 0;
            for (var r in this.PapersInfoList) {
                if (a == n) break;
                t ? s++ : s--;
                var o = this.PapersInfoList[s];
                if (!o) break;
                i.push(o), n++;
            }
            return t ? i : i.reverse();
        }
    }, {
        key: "getPaperInfoPostionById",
        value: function(e) {
            for (var t in this.PapersInfoList) if (this.PapersInfoList[t].RealQuestionId == e) return t;
        }
    }, {
        key: "getPaperInfoById",
        value: function(e) {
            for (var t in this.PapersInfoList) {
                var a = this.PapersInfoList[t];
                if (a.RealQuestionId == e) return a;
            }
        }
    }, {
        key: "getBufferDataListPostion",
        value: function(e, t) {
            for (var a in t) if (t[a].RealQuestionId == e) return a;
        }
    }, {
        key: "getPersInfoList",
        value: function() {
            return this.PapersInfoList;
        }
    }, {
        key: "getPersInfoListByQuantity",
        value: function(e) {
            var t = [];
            for (var a in this.PapersInfoList) {
                if (a == e) break;
                t.push(this.PapersInfoList[a]);
            }
            return t;
        }
    }, {
        key: "getBufferDataList",
        value: function(e, t, a) {
            if (e.length <= this.bufferData) return e;
            var s = t ? a - 2 : e.length - a;
            console.log("getBufferDataList : " + s);
            var i = [];
            for (var n in e) {
                var r = e[n];
                if (t) {
                    if (s > n) continue;
                    i.push(r);
                } else {
                    if (s < n) break;
                    i.push(r);
                }
                if (i.length >= this.bufferData) break;
            }
            return console.log(i), i;
        }
    }, {
        key: "getQuestionType",
        value: function(e) {
            var t = "";
            switch (e) {
              case 10:
                t = "单项选择";
                break;

              case 20:
                t = "多项选择";
                break;

              case 50:
                t = "主观题";
                break;

              case 35:
                t = "不定项选择";
            }
            return t;
        }
    }, {
        key: "getStopTimeExamState",
        value: function() {
            var e = 0;
            for (var t in this.PapersInfoList) {
                var a = this.PapersInfoList[t];
                if (50 != a.QuestionTypeId) if (a.isExplain) e++; else {
                    var s = a.QuestionContentKeyValue;
                    for (var i in s) if (s[i].select) {
                        e++;
                        break;
                    }
                }
            }
            var n = this.PapersInfoList.length - e;
            return 0 == n ? "共" + this.OrderNumber + "道题，已全部作答" : "共" + this.OrderNumber + "道题，还有" + n + "道未作答";
        }
    }, {
        key: "synchronPapersData",
        value: function(e) {
            for (var t in this.PapersInfoList) {
                var a = this.PapersInfoList[t];
                if (e.RealQuestionId == a.RealQuestionId) {
                    a.QuestionContentKeyValue = e.QuestionContentKeyValue, a.IsFavor = e.IsFavor, a.readModleOpen = e.readModleOpen, 
                    e.QuestionTime && (a.QuestionTime = e.QuestionTime), a.AnalysisModle = e.AnalysisModle;
                    break;
                }
            }
        }
    }, {
        key: "getCartInfoList",
        value: function() {
            var e = [], t = [], a = 0, s = {}, i = {};
            for (var n in this.PapersInfoList) {
                var r = this.PapersInfoList[n];
                r.isExplain & !r.isLastItem ? (0 != t.length && (s.cartNumberList = t, e.push(s), 
                t = [], s = {}, a = 0), s.QuestionTitle = r.QuestionTitle) : (r.isLastItem || ((i = {}).RealQuestionId = r.RealQuestionId, 
                i.cartNumber = r.OrderNumber, i.select = this.getCartInfoSelectState(r.RealQuestionId), 
                t[a] = i, a++), n == this.PapersInfoList.length - 1 && (e.length <= 0 && (console.log(this.PaperName), 
                s.QuestionTitle = this.PaperName), s.cartNumberList = t, e.push(s)));
            }
            return e;
        }
    }, {
        key: "getAnsersJson",
        value: function() {
            var e = [];
            for (var t in this.PapersInfoList) {
                var a = this.PapersInfoList[t];
                if (!a.isExplain) {
                    var s = {};
                    s.QuestionId = a.QuestionId, s.AnswerDuration = a.QuestionTime ? Math.round(a.QuestionTime / 1e3) : 0, 
                    s.Options = this.getOptionsAnswers(a), e.push(s);
                }
            }
            return e;
        }
    }, {
        key: "getOptionsAnswers",
        value: function(e) {
            if (50 == e.QuestionTypeId) return "z";
            var t = "";
            for (var a in e.QuestionContentKeyValue) {
                var s = e.QuestionContentKeyValue[a];
                s.select && (t = t + s.Key + ",");
            }
            return t = t.substr(0, t.length - 1);
        }
    }, {
        key: "getCartInfoSelectState",
        value: function(e) {
            for (var t in this.PapersInfoList) {
                var a = this.PapersInfoList[t];
                if (a.RealQuestionId == e) {
                    for (var s in a.QuestionContentKeyValue) if (a.QuestionContentKeyValue[s].select) return !0;
                    return !1;
                }
            }
            return !1;
        }
    }, {
        key: "TransAnalysisAnswer",
        value: function() {
            for (var e in this.PapersInfoList) {
                var t = this.PapersInfoList[e], s = t.QuestionContentKeyValue;
                if (t.QuestionsAnswerEntity) {
                    var i = t.QuestionsAnswerEntity.AnswerArray;
                    for (var n in s) {
                        var r = s[n];
                        a.array_contain(i, r.Key) && (r.select = !0);
                    }
                }
            }
        }
    }, {
        key: "TransAnalysisUserAnswer",
        value: function() {
            for (var e in this.PapersInfoList) {
                var t = this.PapersInfoList[e], s = t.QuestionContentKeyValue;
                if (t.UserAnswerEntity && 1 != t.UserAnswerEntity.IsState) {
                    var i = t.UserAnswerEntity.UserAnswer.split(",");
                    for (var n in s) {
                        var r = s[n];
                        a.array_contain(i, r.Key) && (r.userSelect = !0);
                    }
                }
            }
        }
    }, {
        key: "TransPapersInfoListStyle",
        value: function() {
            for (var e in this.PapersInfoList) {
                var t = this.PapersInfoList[e];
                this.TransKeyValueInfoStyle(t);
            }
        }
    }, {
        key: "refreshPapersInfoListStyle",
        value: function(e) {
            for (var t in e) {
                var a = e[t];
                this.TransKeyValueInfoStyle(a);
            }
        }
    }, {
        key: "clearUserSelect",
        value: function(e) {
            var t = e.QuestionContentKeyValue;
            if (50 != e.QuestionTypeId) for (var a in t) t[a].userSelect = !1;
        }
    }, {
        key: "TransKeyValueInfoStyle",
        value: function(e) {
            var t = e.QuestionContentKeyValue;
            if (50 != e.QuestionTypeId) for (var a in t) {
                var s = t[a], i = "";
                e.UserAnswerEntity && 1 != e.UserAnswerEntity.IsState ? 10 == e.QuestionTypeId ? s.userSelect ? i = "error" : s.select && (i = "active") : s.userSelect && !s.select ? i = "error" : s.userSelect ? i = "with" : s.select && (i = "active") : s.select && (i = "active"), 
                s.style = i;
            }
        }
    }, {
        key: "getAnalysisCartInfoList",
        value: function() {
            var e = [], t = [], a = 0, i = {}, n = {}, r = this.getPaperAnalysisCartList();
            for (var o in r) {
                var l = r[o];
                l.isExplain & !l.isLastItem ? (0 != t.length && (i.cartNumberList = t, e.push(i), 
                t = [], i = {}, a = 0), i.QuestionTitle = l.QuestionTitle) : (l.isLastItem || ((n = {}).RealQuestionId = l.RealQuestionId, 
                n.cartNumber = l.OrderNumber, this.examType == s.globalData.ExamType.collectionSee ? n.select = 0 : n.select = this.getAnalysisCartState(l.RealQuestionId, r), 
                t[a] = n, a++), o == r.length - 1 && (e.length <= 0 && (i.QuestionTitle = this.PaperName), 
                i.cartNumberList = t, e.push(i)));
            }
            return e;
        }
    }, {
        key: "getAnalysisCartState",
        value: function(e, t) {
            for (var a in t) {
                var s = t[a];
                if (s.RealQuestionId == e) return s.UserAnswerEntity ? 0 == s.UserAnswerEntity.IsState ? 2 : 1 : 0;
            }
            return 0;
        }
    }, {
        key: "TransShareModle",
        value: function() {
            for (var e in this.PapersInfoList) {
                var t = this.PapersInfoList[e];
                t.AnalysisModle = !0, t.readModleOpen = !0, t.UserAnswerEntity = null, this.clearUserSelect(t);
            }
        }
    }, {
        key: "TransDoModle",
        value: function() {
            for (var e in this.PapersInfoList) {
                var t = this.PapersInfoList[e];
                t.AnalysisModle = !0, t.readModleOpen = !1, this.clearUserSelect(t);
            }
        }
    }, {
        key: "refreshDoModle",
        value: function(e) {
            for (var t in e) {
                var a = e[t];
                a.AnalysisModle = !0, a.readModleOpen = !1, this.clearUserSelect(a);
            }
        }
    }, {
        key: "TransReciteModle",
        value: function() {
            for (var e in this.PapersInfoList) {
                var t = this.PapersInfoList[e];
                t.AnalysisModle = !1, t.readModleOpen = !0, this.clearUserSelect(t);
            }
        }
    }, {
        key: "refreshReciteModle",
        value: function(e) {
            for (var t in e) {
                var a = e[t];
                a.AnalysisModle = !1, a.readModleOpen = !0, this.clearUserSelect(a);
            }
        }
    }, {
        key: "TransErroAnalysisModle",
        value: function() {
            var e = [];
            for (var t in this.PapersInfoList) {
                var a = this.PapersInfoList[t];
                a.isExplain ? e.push(a) : a.UserAnswerEntity ? 0 == a.UserAnswerEntity.IsState && e.push(a) : e.push(a);
            }
            this.PapersInfoList = e;
        }
    }, {
        key: "getUserSelectAnswer",
        value: function(e) {
            var t = "";
            for (var a in e) {
                var s = e[a];
                s.userSelect && (t = t + s.Key + ",");
            }
            return t = t.substr(0, t.length - 1);
        }
    }, {
        key: "getUserAnswerState",
        value: function(e, t) {
            var a = this.getUserSelectAnswer(e), s = "";
            for (var i in t) s = s + t[i] + ",";
            return s = s.substr(0, s.length - 1), console.log(a), console.log(s), a == s ? 1 : 0;
        }
    } ]), i;
}();

exports.PapersAdpter = i;