package edu.hytc.jike6.wxdemo.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.hytc.jike6.wxdemo.Draw.Draw;
import edu.hytc.jike6.wxdemo.Draw.UserDraw;

/*记录抽奖用户信息*/
public class UserUtils {
	/* 存放个人中奖信息 */
	public static Map<String,List<Draw>> userMap=new HashMap<String,List<Draw>>();
	
	/* 存放所有用户中奖信息 */
	public static List<UserDraw> userDrawList=new ArrayList<UserDraw>();
}
