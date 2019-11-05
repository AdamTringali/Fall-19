import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;


public class BackTrack {
	String U;
	String sets;
	int[] aset;
	String setCover;
	int currentMinSetCover;

	public BackTrack(String universal, String numSet){
		U = universal;
		sets = numSet;
		aset = new int[Integer.parseInt(U)];
		setCover = "";
		currentMinSetCover = 0;

	}

	public String toString(){
		String str = "U:[" + U + "], Sets: [" + sets + "]\n";
		str += "setCover: " + setCover + "\n";
		str += "currentMinSetCover: " + currentMinSetCover + "\n";
		return str;
	}

	public void analyzeSet(String set){
		boolean add = false;
		
		if(!checkForFull()){
			String[] p = set.split(" ");
	
			
			for(int i = 0; i < (p.length ); i++){
				if(aset[Integer.parseInt(p[i])-1] == 0){//no item has been found for index 
					aset[Integer.parseInt(p[i])-1] = 1;
					add = true;
				}
			}
			
	
			
			if(add)
				setCover += "[" + set + "],";
	
	
			//this.mySet();
			System.out.print(set + "\n");
		}
	}

	private boolean checkForFull() {
		// TODO Auto-generated method stub
		int total = 0;
		for(int i = 0; i < aset.length; i++){
			total += aset[i];
		}
		
		if(total == Integer.parseInt(U)){
			System.out.print("FOUND \n\n");
			currentMinSetCover = setCover.split(",").length;
			return true;
		}
		
		return false;
		
	}

	public void mySet(){
		String str = " ";
		for(int i = 0; i < aset.length; i++){
			str += aset[i] + " ";
		}
		System.out.print(str + "|| ") ;
	}



	public static void main(String args[]) throws IOException{

		for(int i = 0; i < 1; i++){
			BufferedReader br = new BufferedReader(new FileReader("file " + (i+1)));
			String str = br.readLine();

			BackTrack bt = new BackTrack(str, br.readLine());
			System.out.print(bt.toString());


			while((str = br.readLine()) != null){
				bt.analyzeSet(str);
				System.out.print(bt.toString());
			}
			
			

			

			br.close();
		}
	}

}


