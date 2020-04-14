CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `userNo` varchar(20) DEFAULT NULL COMMENT '学号或教职工号 登录号',
  `passward` varchar(20) DEFAULT NULL COMMENT '密码',
  `schoolId` int(4) DEFAULT NULL COMMENT '学校id',
  `majorId` int(4) DEFAULT NULL COMMENT '学院id',
  `mail` varchar(20) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `roleId` int(4) DEFAULT NULL COMMENT '角色id',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
　　
CREATE TABLE `dictParam` (
  `dictId` int(11) NOT NULL AUTO_INCREMENT,
  `paramCode` varchar(20) DEFAULT NULL,
  `paramValue` int(4) DEFAULT NULL COMMENT '下拉框id',
  `paramName` varchar(20) DEFAULT NULL COMMENT '下拉框name',
  PRIMARY KEY (`dictId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
　　
CREATE TABLE `fileInfo` (
  `fileId` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleItemId` int(11) DEFAULT NULL,
  `fileUrl` varchar(20) DEFAULT NULL COMMENT '文件url路径',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`fileId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8

　　
CREATE TABLE `messageBack` (
  `backId` int(11) NOT NULL AUTO_INCREMENT,
  `messageId` int(11) DEFAULT NULL,
  `backInfo` varchar(200) DEFAULT NULL COMMENT '评价内容',
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`backId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8

CREATE TABLE `message` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `messageInfo` varchar(200) DEFAULT NULL COMMENT '评价内容',
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8

CREATE TABLE `scheduleItem` (
  `scheduleItemId` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleId` int(11) DEFAULT NULL,
  `scheduleName` varchar(200) DEFAULT NULL COMMENT '课程名称',
  `scheduleItemName` varchar(200) DEFAULT NULL COMMENT '课程小节名称',
  `scheduleSeq` int(11) DEFAULT NULL COMMENT '课程小节次序',
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`scheduleItemId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8


CREATE TABLE `scheduleUserRel` (
  `relId` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`relId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8


CREATE TABLE `testAnswerInfo` (
  `answerId` int(11) NOT NULL AUTO_INCREMENT,
  `answerSeq` int(11) DEFAULT NULL COMMENT 'A B C D',
  `isTrue` int(11) DEFAULT NULL COMMENT '是否是正确答案 1是0否',
  `answerName` varchar(200) DEFAULT NULL COMMENT '答案内容',
  `testNo` varchar(20) DEFAULT NULL COMMENT '试卷编码',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`answerId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8

CREATE TABLE `testInfo` (
  `testId` int(11) NOT NULL AUTO_INCREMENT,
  `scheduleItemId` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  `testName` varchar(200) DEFAULT NULL COMMENT '试卷名称',
  `testNo` varchar(20) DEFAULT NULL COMMENT '试卷编码',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`testId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8


CREATE TABLE `testUserHis` (
  `hisId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `scheduleItemId` int(11) DEFAULT NULL,
  `answerId` int(11) NOT NULL,
  `testNo` varchar(20) DEFAULT NULL COMMENT '试卷编码',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`hisId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8

