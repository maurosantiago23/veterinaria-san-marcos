package cl.duoc.vet_sanmarcos_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;

@SpringBootApplication
public class VetSanmarcosBackendApplication {

	public static void main(String[] args) {
		// Configuracion automatica de TNS_ADMIN para la Wallet de Oracle Cloud
		if (System.getProperty("oracle.net.tns_admin") == null) {
			String os = System.getProperty("os.name").toLowerCase();
			String walletPath;
			if (os.contains("win")) {
				File subfolder = new File("C:/Users/mauro/Downloads/veterinaria-san-marcos/wallet/Wallet_vetsanmarcos/tnsnames.ora");
				walletPath = subfolder.exists()
						? "C:/Users/mauro/Downloads/veterinaria-san-marcos/wallet/Wallet_vetsanmarcos"
						: "C:/Users/mauro/Downloads/veterinaria-san-marcos/wallet";
			} else {
				// Entorno Linux (AWS EC2)
				File subfolder = new File("/home/ec2-user/wallet/Wallet_vetsanmarcos/tnsnames.ora");
				walletPath = subfolder.exists()
						? "/home/ec2-user/wallet/Wallet_vetsanmarcos"
						: "/home/ec2-user/wallet";
			}
			System.setProperty("oracle.net.tns_admin", walletPath);
			System.out.println("[ORACLE WALLET] oracle.net.tns_admin configurado automaticamente en: " + walletPath);
		}

		SpringApplication.run(VetSanmarcosBackendApplication.class, args);
	}

}
