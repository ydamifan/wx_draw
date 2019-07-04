package edu.hytc.jike6.wxdemo.Draw;

/*奖项类，存放奖项信息*/

public class Draw {
	private String level;
	private String name;
	private Double probability;
	private Integer number; //奖品剩余数量
	private Integer sumNumber; //奖品总数量
	private String date; 
	
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Draw() {
	}

	public Draw(String level, String name, Double probability, Integer number) {
		this.level = level; // 奖项等级
		this.name = name; // 名称
		this.number = number; // 奖品剩余数量
		this.sumNumber = number; // 奖品总数量
		this.probability = probability; // 奖项概率
	}

	public Integer getSumNumber() {
		return sumNumber;
	}

	public void setSumNumber(Integer sumNumber) {
		this.sumNumber = sumNumber;
	}

	public Double getProbability() {
		return probability;
	}

	public void setProbability(Double probability) {
		this.probability = probability;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
