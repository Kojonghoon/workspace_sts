package com.example.demo;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
//@Configuration
//사용자 정으 ㅣ클래스도 ApplicationContext나 BeanFactory의 관리를 받을 수 있다. - Dependency Injection
//Application.properties - maven
//application.yml - gradle - 반복코드 없음 -json포맷이래서
//resource - mapper ->member.xml, board.xml, order.xml
//static - CND
//css
//js
//images

@Configuration
@PropertySource("classpath:/application.properties") // classpath -> resource ->log4j.properties
//@PropertySource("classpath:/application.yml") //classpath -> resource ->log4j.properties
//@MapperScan(basePackages = "com.example.demo.mapper")
public class DatabaseConfiguration {
	private static final Logger logger = LogManager.getLogger(DatabaseConfiguration.class);

	// @Configuration으로 선언된 클래스 에서만 사용가능한 어노테이션임 -@Bean
	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.hikari") // application.properties의 접두어
	public HikariConfig hikariConfig() {// 인스턴ㅅ스화
		return new HikariConfig(); // 생성자 호출 - 메모리 로딩 - 변수와 메소드를 누릴 수 있음
	}

	// 물리적으로 떨어져 있는 오라클(application.properties)서버와 연결통로 확보
	// POJO에서는 MyBatisConfig.xm;<-hikariConfig()
	@Bean
	public DataSource dataSource() {
		// 인터페이스 = 구현체 클래스 (new hikariConfig()) ->application.properties
		DataSource dataSource = new HikariDataSource(hikariConfig());
		logger.info("datasource : {}", dataSource);
		return dataSource;
	}

	@Autowired
	private ApplicationContext applicationContext; // 빈관리 - 이른 인스턴스화 -BeanFactory의 자손 클래스임 - 그래서 기능은 더 많다.
	

	/* <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	 * <property name="configLocation" value="WEB-INF/mybatis-config.xml" />
	 * <property name="dataSource" ref="data-source-target" />
	 * </bean>
	 */
	
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:/mapper/**/*.xml"));
		return sqlSessionFactoryBean.getObject();
	}

	/*
	 * 	<bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate">
	 * 	<constructor-arg index="0" ref="sqlSessionFactory" />
	 *	</bean>
	 */
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}