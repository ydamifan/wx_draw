package edu.hytc.jike6.wxdemo.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.hytc.jike6.wxdemo.Draw.Draw;
import edu.hytc.jike6.wxdemo.Draw.UserDraw;
import edu.hytc.jike6.wxdemo.util.DrawUtil;
import edu.hytc.jike6.wxdemo.util.UserUtils;

/*抽奖控制器*/

@Controller // 控制器，可以被HTTP访问
public class Drawcontroller {

	/* 抽奖 */
	@RequestMapping("/draw")
	@ResponseBody
	public Draw draw(String username) {

		// System.out.println(username);
		double r = Math.random();// 0.0000000~9.9999999
		double temp = 0;
		Draw result = new Draw();
		result.setLevel("未中奖");
		for (Draw d : DrawUtil.draws) { // 遍历所有奖项数组
			if (r < (temp = d.getProbability() + temp) && d.getNumber() > 0) {
				result = d;
				d.setNumber(d.getNumber() - 1);
				break;
			}
		}
		/* 记录个人中奖信息,中奖和不中奖都存 */
		List<Draw> userDraws = UserUtils.userMap.get(username);// 查询是否有该用户信息
		if (userDraws == null) {
			userDraws = new ArrayList<Draw>();// 没有则新建
		}
		Draw myDraw = new Draw();
		myDraw.setLevel(result.getLevel());
		myDraw.setName(result.getName());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm");// 时间格式化器
		myDraw.setDate(sdf.format(new Date()));
		userDraws.add(myDraw);// 增加个人中奖信息
		UserUtils.userMap.put(username, userDraws);// 增加个人中奖信息
		// System.out.println(UserUtils.userMap);

		/* 增加所有用户的中奖信息，只存中奖的 */
		if (myDraw.getLevel() != "未中奖") {
			UserDraw ud = new UserDraw();
			ud.setD(myDraw);
			ud.setUsername(username);
			UserUtils.userDrawList.add(ud);
		}

		return myDraw;
	}

	/* 获取个人奖项信息 */
	@RequestMapping("/getUserDraw")
	@ResponseBody
	public List<Draw> getUserDraw(String userName) {
		return UserUtils.userMap.get(userName);
	}

	/* 获取奖品设置信息 */
	@RequestMapping("/getDrawInfo")
	@ResponseBody
	public Draw[] getDrawInfo() {
		return DrawUtil.draws;
	}

	/* 获取所有用户获奖信息 */
	@RequestMapping("/getUserDrawList")
	@ResponseBody
	public List<UserDraw> getUserDrawList() {

		List<UserDraw> re = new ArrayList<UserDraw>();
		for (int i = UserUtils.userDrawList.size()- 1; i >= (UserUtils.userDrawList.size() > 5 ? UserUtils.userDrawList.size() - 5 : 0); i--) {
			UserDraw ud=UserUtils.userDrawList.get(i);
			ud.setUsername(ud.getUsername().substring(0,1)+"***");
			re.add(ud);
		}
		return re;

	}
}
