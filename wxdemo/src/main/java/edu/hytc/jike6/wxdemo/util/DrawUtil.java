package edu.hytc.jike6.wxdemo.util;

import edu.hytc.jike6.wxdemo.Draw.Draw;

/*抽奖公共类，缓存奖项信息和剩余数量*/

public class DrawUtil {

	public static Draw[] draws;

	static {
		draws = new Draw[3];
		draws[0] = new Draw("一等奖", "iPhoneXS Max一部", 0.003d, 10);
		draws[1] = new Draw("二等奖", "20元微信红包", 0.1d, 200);
		draws[2] = new Draw("三等奖", "5元微信红包", 0.2d, 3000);
	}
}
