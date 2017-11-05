import React, { Component } from 'react'
import '../css/NERGuide.css'

export default class NERGuide extends Component {
  render (){
    return (
      <div className="ner-guide">
        <table className="table-intent">
          <tbody>
            <tr>
              <th>Intent</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>accessories</td> 
              <td>Đồ chơi xe</td>
            </tr>
            <tr>
              <td>accessories_consultant</td>  
              <td>Tư vấn đồ chơi xe</td>
            </tr>
            <tr>
              <td>ask_price</td> 
              <td>Hỏi giá xe</td>
            </tr>
            <tr>
              <td>autopilot</td>
              <td>Xe tự lái</td>
            </tr>
            <tr>
              <td>cancel</td>
              <td>bỏ qua</td>
            </tr>
            <tr>
              <td>care</td>  
              <td>Dụng cụ chăm sóc xe</td>
            </tr>
            <tr>
              <td>care_consultant</td>
              <td>Tư vấn chăm sóc xe</td>
            </tr>
            <tr>
              <td>career</td>
              <td>Nghề nghiệp</td>
            </tr>
            <tr>
              <td>club</td>
              <td>Câu lạc bộ xe</td>
            </tr>
            <tr>
              <td>compare_brand</td>
              <td>So sánh thương hiệu</td>
            </tr>
            <tr>
              <td>compare_country</td>
              <td>So sánh xuất xứ</td>
            </tr>
            <tr>
              <td>compare_exterior</td>
              <td>So sánh ngoại thất</td>
            </tr>
            <tr>
              <td>compare_interior</td>
              <td>So sánh nội thất</td>
            </tr>
            <tr>
              <td>compare_model</td>
              <td>So sánh xe</td>
            </tr>
            <tr>
              <td>compare_price</td>
              <td>So sánh về giá</td>
            </tr>
            <tr>
              <td>compare_salesfigures</td>
              <td>So sánh doanh số</td>
            </tr>
            <tr>
              <td>compare_source</td>
              <td>So sánh nguồn gốc của xe</td>
            </tr>
            <tr>
              <td>compare_technology</td>
              <td>So sánh công nghệ</td>
            </tr>
            <tr>
              <td>consultant_buy</td>
              <td>Tư vấn mua xe</td>
            </tr>
            <tr>
              <td>consultant_buy_age</td>
              <td>Tư vấn mua xe theo tuổi</td>
            </tr>
            <tr>
              <td>consultant_buy_five_elements</td>
              <td>Tư vấn mua xe theo ngũ hành</td>
            </tr>
            <tr>
              <td>consultant_buy_gender</td>
              <td>Tư vấn mua xe theo giới tính</td>
            </tr>
            <tr>
              <td>consultant_buy_income</td>
              <td>Tư vấn mua xe theo thu nhập</td>
            </tr>
            <tr>
              <td>consultant_buy_traffic</td>
              <td>Tư vấn mua xe theo giao thông</td>
            </tr>              
            <tr>
              <td>consultant_finance</td>
              <td>Tư vấn tài chính</td>
            </tr>
            <tr>
              <td>consultant_price</td> 
              <td>Tư vấn mua xe theo giá</td>
            </tr>
            <tr>
              <td>consultant_road</td>
              <td>Tư vấn đường đi</td>
            </tr>
            <tr>
              <td>definition</td>
              <td>Định nghĩa</td>
            </tr>
            <tr>
              <td>document</td>
              <td>Tài liệu tham khảo</td>
            </tr>
            <tr>
              <td>driving_mode</td>
              <td>Chế độ lái</td>
            </tr>
            <tr>
              <td>duration</td>
              <td>Niên hạn sử dụng</td>
            </tr>
            <tr>
              <td>electronic</td>
              <td>Hệ thống điện</td>
            </tr>
            <tr>
              <td>engine_compare</td>
              <td>So sánh động cơ</td>
            </tr>
            <tr>
              <td>engine_consultant</td>
              <td>Tư vấn động cơ</td>
            </tr>
            <tr>
              <td>engine_general</td>
              <td>Động cơ</td>
            </tr>
            <tr>
              <td>environment</td>
              <td>Tác động môi trường</td>
            </tr>
            <tr>
              <td>experience_buy</td>
              <td>Kinh nghiệm mua xe</td>
            </tr>
            <tr>
              <td>experience_driving</td>
              <td>Kinh nghiệm lái xe</td>
            </tr>
            <tr>
              <td>experience_entertainment</td>
              <td>Kinh nghiệm giải trí</td>
            </tr>
            <tr>
              <td>experience_fixing</td>
              <td>Kinh nghiệm sửa xe</td>
            </tr>
            <tr>
              <td>experience_fuel</td>
              <td>Kinh nghiệm nhiên liệu</td>
            </tr>
            <tr>
              <td>experience_modify</td> 
              <td>Kinh nghiệm độ xe</td>
            </tr>
            <tr>
              <td>experience_parking</td>
              <td>Kinh nghiệm đỗ xe</td>
            </tr>
            <tr>
              <td>experience_technique</td> 
              <td>Kinh nghiệm kỹ thuật</td>
            </tr>
            <tr>
              <td>find_car</td>
              <td>Xe</td>
            </tr>
            <tr>
              <td>forum</td>
              <td>Diễn đàn xe hơi</td>
            </tr>
            <tr>
              <td>fuel_saving</td> 
              <td>Tiết kiệm nhiên liệu</td>
            </tr>
            <tr>
              <td>gear_box_compare</td>
              <td>So sánh hộp số</td>
            </tr>
            <tr>
              <td>gear_box_consultant</td>
              <td>Tư vấn về hộp số</td>
            </tr>
            <tr>
              <td>gear_box_general</td>
              <td>Hộp số</td>
            </tr>
            <tr>
              <td>good_bye</td>
              <td>Tạm biệt</td>
            </tr>
            <tr>
              <td>greating</td>
              <td>Lời chào</td>
            </tr>
            <tr>
              <td>healthy</td>
              <td>Sức khỏe</td>
            </tr>
            <tr>
              <td>idealistic</td>
              <td>Tâm linh</td>
            </tr>
            <tr>
              <td>insurrance</td>
              <td>Bảo hiểm</td>
            </tr>
            <tr>
              <td>law_modify</td>
              <td>Luật về độ xe</td>
            </tr>
            <tr>
              <td>law_traffic</td>
              <td>Luật giao thông</td>
            </tr>
            <tr>
              <td>license_learn_driving</td>
              <td>Học bằng lái xe</td>
            </tr>
            <tr>
              <td>license_procedure</td>
              <td>Thủ tục bằng lái</td>
            </tr>
            <tr>
              <td>license_test</td>
              <td>Thi bằng lái xe</td>
            </tr>
            <tr>
              <td>love_bot</td>
              <td>Yêu thương</td>
            </tr>
            <tr>
              <td>maintenance</td>
              <td>Bảo dưỡng</td>
            </tr>
            <tr>
              <td>marketing</td>
              <td>Quảng cáo</td>
            </tr>
            <tr>
              <td>modify_engine</td>
              <td>Độ chế động cơ</td>
            </tr>
            <tr>
              <td>modify_exterior</td>
              <td>Độ chế ngoại thất</td>
            </tr>
            <tr>
              <td>modify_interior</td>
              <td>Độ chế nội thất</td>
            </tr>
            <tr>
              <td>news_competition</td>
              <td>Các cuộc thi về xe</td>
            </tr>
            <tr>
              <td>news_market</td>
              <td>Tin tức thị trường</td>
            </tr>
            <tr>
              <td>news_racing</td>
              <td>Tin tức đua xe</td>
            </tr>
            <tr>
              <td>news_supercar</td>
              <td>Tin tức về siêu xe</td>
            </tr>
            <tr>
              <td>news_technology</td>
              <td>Tin tức công nghệ</td>
            </tr>
            <tr>
              <td>news_traffic</td>
              <td>Tin tức giao thông</td>
            </tr>
            <tr>
              <td>opex</td>
              <td>Chi phí sử dụng xe</td>
            </tr>
            <tr>
              <td>option</td>
              <td>Trang bị</td>
            </tr>
            <tr>
              <td>option_consultant</td>
              <td>Tư vấn lựa chọn trang bị</td>
            </tr>
            <tr>
              <td>paperwork_import</td>
              <td>Thủ tục nhập khẩu</td>
            </tr>
            <tr>
              <td>paperwork_procedure</td>
              <td>Thủ tục hành chính</td>
            </tr>
            <tr>
              <td>promotion</td>
              <td>Khuyến mãi</td>
            </tr>
            <tr>
              <td>purpose</td>
              <td>Mục đích mua xe</td>
            </tr>
            <tr>
              <td>review_brand</td>
              <td>Đánh giá thương hiệu</td>
            </tr>
            <tr>
              <td>review_country</td>
              <td>Đánh giá xuất xứ</td>
            </tr>
            <tr>
              <td>review_driving</td>
              <td>Cảm giác lái</td>
            </tr>
            <tr>
              <td>review_engine</td>
              <td>Đánh giá động cơ</td>
            </tr>
            <tr>
              <td>review_exterior</td>
              <td>Đánh giá ngoại thất</td>
            </tr>
            <tr>
              <td>review_general</td>
              <td>Đánh giá xe</td>
            </tr>
            <tr>
              <td>review_interior</td>
              <td>Đánh giá nội thất</td>
            </tr>
            <tr>
              <td>review_performance</td>
              <td>Đánh giá hiệu suất</td>
            </tr>
            <tr>
              <td>review_price</td>
              <td>Đánh giá về giá bán của xe</td>
            </tr>
            <tr>
              <td>review_safety</td>
              <td>Đánh giá an toàn</td>
            </tr>
            <tr>
              <td>review_technology</td>
              <td>Đánh giá công nghệ</td>
            </tr>
            <tr>
              <td>sales</td>
              <td>Bán xe</td>
            </tr>
            <tr>
              <td>salon_compare</td>
              <td>So sánh salon</td>
            </tr>
            <tr>
              <td>salon_review</td>
              <td>Đánh giá salon</td>
            </tr>
            <tr>
              <td>security_alarm</td>
              <td>Chuông cảnh báo</td>
            </tr>
            <tr>
              <td>security_gps</td>
              <td>Định vị GPS</td>
            </tr>
            <tr>
              <td>security_lock</td>
              <td>Khóa bảo vệ</td>
            </tr>
            <tr>
              <td>service_procedure</td>
              <td>Dịch vụ hành chính</td>
            </tr>
            <tr>
              <td>service_rent</td>
              <td>Dịch vụ thuê xe</td>
            </tr>
            <tr>
              <td>show_brand</td>
              <td>Thương hiệu xe</td>
            </tr>
            <tr>
              <td>show_dimension</td>
              <td>Thông số kích thước</td>
            </tr>
            <tr>
              <td>show_exterior</td>
              <td>Ngoại thất</td>
            </tr>
            <tr>
              <td>show_fuel_consumption</td>
              <td>Tiêu thụ nhiên liệu</td>
            </tr>
            <tr>
              <td>show_interior</td>
              <td>Nội thất</td>
            </tr>
            <tr>
              <td>show_technical_specifics</td>
              <td>Thông số kỹ thuật</td>
            </tr>
            <tr>
              <td>smart_connect</td>
              <td>Kết nối thông minh</td>
            </tr>
            <tr>
              <td>sos</td>
              <td>Cứu hộ giao thông</td>
            </tr>
            <tr>
              <td>spare_part</td>
              <td>Phụ tùng</td>
            </tr>
            <tr>
              <td>spare_part_consultant</td>
              <td>Tư vấn phụ tùng</td>
            </tr>
            <tr>
              <td>supercar_consultant</td>
              <td>Tư vấn về siêu xe</td>
            </tr>
            <tr>
              <td>supercar_review</td>
              <td>Đánh giá siêu xe</td>
            </tr>
            <tr>
              <td>tax_fee</td>
              <td>Thuế và phí</td>
            </tr>
            <tr>
              <td>test_drive</td>
              <td>Lái thử</td>
            </tr>
            <tr>
              <td>thanks</td>
              <td>Cảm ơn</td>
            </tr>
            <tr>
              <td>tire_compare</td>
              <td>So sánh lốp xe</td>
            </tr>
            <tr>
              <td>tire_consultant</td>
              <td>Tư vấn lốp xe</td>
            </tr>
            <tr>
              <td>tire_review</td>
              <td>Đánh giá lốp xe</td>
            </tr>
            <tr>
              <td>traffic_culture</td>
              <td>Văn hóa giao thông</td>
            </tr>
            <tr>
              <td>wishes</td>
              <td>Lời chúc</td>
            </tr>
            <tr>
              <td>check_price</td>
              <td>Kiểm tra giá</td>
            </tr>
            <tr>
              <td>find_used_car</td>
              <td>Tìm xe cũ</td>
            </tr>
            <tr>
              <td>comment_positive</td>
              <td>Bình luận tích cực</td>
            </tr>
            <tr>
              <td>comment_negative</td>
              <td>Bình luận tiêu cực</td>
            </tr>
            <tr>
              <td>compare_dimension</td>
              <td>So sánh kích thước</td>
            </tr>
            <tr>
              <td>ask_element</td>
              <td>Hỏi thành phần</td>
            </tr>
            <tr>
              <td>car_similarity</td> 
              <td>Có thể  bạn quan tâm</td>
            </tr>
            <tr>
              <td>check_car_service</td>
              <td>Dịch vụ kiểm định xe</td>
            </tr>
            <tr>
              <td>ask_0to60mph</td>
              <td>Hỏi thời gian để tốc độ đạt 100km/h</td>
            </tr>
            <tr>
              <td>ask_top_track_speed</td>
              <td>Hỏi tốc độ tối đa</td>
            </tr>
            <tr>
              <td>ask_fuel_tank</td>
              <td>Kích thước bình xăng</td>
            </tr>
            <tr>
              <td>compare_fuel_tank</td>
              <td>So sánh bình xăng</td>
            </tr>
            <tr>
              <td>ask_safety</td>
              <td>Hỏi về trang bị an toàn có trên xe</td>
            </tr>
            <tr>
              <td>consultant_safety</td>
              <td>Tư vấn về an toàn trên xe</td>
            </tr>
            <tr>
              <td>show_gallery</td>
              <td>Hình ảnh về xe</td>
            </tr>
            <tr>
              <td>highlight_features</td>
              <td>Những tính năng nổi bật</td>
            </tr>
            <tr>
              <td>best_selling</td>
              <td>Những mẫu xe bán chạy nhất</td>
            </tr>
            <tr>
              <td>ask_fault</td>
              <td>Hỏi về lỗi xe</td>
            </tr>
            <tr>
              <td>find_dealer</td>
              <td>Tìm đại lý</td>
            </tr>
            <tr>
              <td>compare_specs</td>
              <td>So sánh thông số kỹ thuật</td>
            </tr>
            <tr>
              <td>car_series</td>
              <td>Dòng xe</td>
            </tr>
            <tr>
              <td>new_arrivals</td>
              <td>Xe mới</td>
            </tr>
            <tr>
              <td>sitemap</td>
              <td>Sơ đồ website</td>
            </tr>
            <tr>
              <td>find_economic_car</td>
              <td>Những dòng xe giá thấp</td>
            </tr>
            <tr>
              <td>find_most_expensive_car</td>
              <td>Những dòng xe đắt nhất</td>
            </tr>
            <tr>
              <td>find_fastest_car</td>
              <td>Top xe nhanh nhất thế giới</td>
            </tr>
            <tr>
              <td>sentiment_exterior_positive</td>
              <td>Bình luận tích cực về ngoại thất</td>
            </tr>
            <tr>
              <td>sentiment_exterior_negative</td>
              <td>Bình luận tiêu cực về ngoại thất</td>
            </tr>
            <tr>
              <td>sentiment_exterior_neutral</td>
              <td>Bình luận trung lập về ngoại thất</td>
            </tr>
            <tr>
              <td>sentiment_interior_positive</td>
              <td>Bình luận tích cực về nội thất</td>
            </tr>
            <tr>
              <td>sentiment_interior_negative</td>
              <td>Bình luận tiêu cực về nội thất</td>
            </tr>
            <tr>
              <td>sentiment_interior_neutral</td>
              <td>Bình luận trung lập về nội thất</td>
            </tr>
            <tr>
              <td>sentiment_engine_positive</td>
              <td>Bình luận tích cực về động cơ</td>
            </tr>
            <tr>
              <td>sentiment_engine_negative</td>
              <td>Bình luận tiêu cực về động cơ</td>
            </tr>
            <tr>
              <td>sentiment_engine_neutral</td>
              <td>Bình luận trung lập về động cơ</td>
            </tr>
            <tr>
              <td>sentiment_driving_positive</td>
              <td>Bình luận tích cực về cảm giác lái</td>
            </tr>
            <tr>
              <td>sentiment_driving_negative</td>
              <td>Bình luận tiêu cực về cảm giác lái</td>
            </tr>
            <tr>
              <td>sentiment_driving_neutral</td>
              <td>Bình luận trung lập về cảm giác lái</td>
            </tr>
            <tr>
              <td>sentiment_fuel_consumption_positive</td>
              <td>Bình luận tích cực về tiêu thụ nhiên liệu</td>
            </tr>
            <tr>
              <td>sentiment_fuel_consumption_negative</td>
              <td>Bình luận tiêu cực về tiêu thụ nhiên liệu</td>
            </tr>
            <tr>
              <td>sentiment_fuel_consumption_neutral</td>
              <td>Bình luận trung lập về tiêu thụ nhiên liệu</td>
            </tr>
            <tr>
              <td>sentiment_safety_positive</td>
              <td>Bình luận tích cực về độ an toàn</td>
            </tr>
            <tr>
              <td>sentiment_safety_negative</td>
              <td>Bình luận tiêu cực về độ an toàn</td>
            </tr>
            <tr>
              <td>sentiment_safety_neutral</td>
              <td>Bình luận trung lập về độ an toàn</td>
            </tr>
            <tr>
              <td>sentiment_noisy_positive</td>
              <td>Bình luận tích cực về cách âm chống ồn</td>
            </tr>
            <tr>
              <td>sentiment_noisy_negative</td>
              <td>Bình luận tiêu cực về cách âm chống ồn</td>
            </tr>
            <tr>
              <td>sentiment_noisy_neutral</td>
              <td>Bình luận trung lập về cách âm chống ồn</td>
            </tr>
            <tr>
              <td>sentiment_opex_positive</td>
              <td>Bình luận tích cực về chi phí vận hành</td>
            </tr>
            <tr>
              <td>sentiment_opex_negative</td>
              <td>Bình luận tiêu cực về chi phí vận hành</td>
            </tr>
            <tr>
              <td>sentiment_opex_neutral</td>
              <td>Bình luận trung lập về chi phí vận hành</td>
            </tr>
            <tr>
              <td>sentiment_feature_positive</td>
              <td>Bình luận tích cực về tính năng trên xe</td>
            </tr>
            <tr>
              <td>sentiment_feature_negative</td>
              <td>Bình luận tiêu cực về tính năng trên xe</td>
            </tr>
            <tr>
              <td>sentiment_feature_neutral</td>
              <td>Bình luận trung lập về tính năng trên xe</td>
            </tr>
            <tr>
              <td>sentiment_positive</td>
              <td>Bình luận tích cực chung về 1 xe</td>
            </tr>
            <tr>
              <td>sentiment_negative</td>
              <td>Bình luận tiêu cực chung về 1 xe</td>
            </tr>
            <tr>
              <td>sentiment_neutral</td>
              <td>Bình luận trung lập chung về 1 xe</td>
            </tr>
            <tr>
              <td>car_pricing_estimate</td> 
              <td>Ước tính giá lăn bánh</td>
            </tr>
            <tr>
              <td>ask_element_wheel</td>
              <td>Hỏi mâm xe</td>
            </tr>
            <tr>
              <td>ask_element_color</td>
              <td>Hỏi màu xe</td>
            </tr>
            <tr>
              <td>ask_element_airbag</td>
              <td>Hỏi số túi khí</td>
            </tr>
            <tr>
              <td>car_introduction</td>
              <td>Giới thiệu xe</td>
            </tr>
            <tr>
              <td>my_garage</td>
              <td>Gara của tôi</td>
            </tr>
            <tr>
              <td>put_car_to_my_garage</td>
              <td>Đưa xe vào Gara</td>
            </tr>
            <tr>
              <td>pop_car_from_my_garage</td>
              <td>Đưa xe ra khỏi Gara</td>
            </tr>
            <tr>
              <td>reorder_my_garage</td>
              <td>Sắp xếp xe trong Gara</td>
            </tr>
            <tr>
              <td>this_is_my_car</td>
              <td>Đây là xe của tôi</td>
            </tr>
            <tr>
              <td>news_new_car_model</td>
              <td>Tin tức giới thiệu mẫu xe mới</td>
            </tr>
            <tr>
              <td>user_tags</td>
              <td>Tag của người dùng</td>
            </tr>
            <tr>
              <td>most_favorites_brand</td>
              <td>Hãng xe nổi tiếng</td>
            </tr>
            <tr>
              <td>most_favorites_car_series</td>
              <td>Dòng xe nổi tiếng</td>
            </tr>
            <tr>
              <td>ask_sentiment_exterior</td>
              <td>Đánh giá về ngoại thất xe</td>
            </tr>
            <tr>
              <td>ask_sentiment_interior</td>
              <td>Đánh giá về nội thất xe</td>
            </tr>
            <tr>
              <td>ask_sentiment_engine</td>
              <td>Đánh giá về động cơ</td>
            </tr>
            <tr>
              <td>ask_sentiment_driving</td>
              <td>Đánh giá về cảm giá lái</td>
            </tr>
            <tr>
              <td>ask_sentiment_fuel_consumption</td>
              <td>Đánh giá về mức tiêu thụ nhiên liệu</td>
            </tr>
            <tr>
              <td>ask_sentiment_safety</td>
              <td>Đánh giá về trang bị an toàn</td>
            </tr>
            <tr>
              <td>ask_sentiment_noisy</td>
              <td>Đánh giá về cách âm chống ồn</td>
            </tr>
            <tr>
              <td>ask_sentiment_opex</td>
              <td>Đánh giá chi phí vận hành, bảo trì, bảo dưỡng</td>
            </tr>
            <tr>
              <td>ask_sentiment_feature</td>
              <td>Đánh giá về các trang bị, tính năng</td>
            </tr>
            <tr>
              <td>my_account</td>
              <td>Tài khoản của tôi</td>
            </tr>
            <tr>
              <td>logout</td>
              <td>Đăng xuất tài khoản</td>
            </tr>
            <tr>
              <td>login</td>
              <td>Đăng nhập tài khoản</td>
            </tr>
            <tr>
              <td>trending</td>
              <td>Xu hướng</td>
            </tr>
            <tr>
              <td>top_rank</td>
              <td>Đánh giá tốt nhất</td>
            </tr>
            <tr>
              <td>help</td>
              <td>Trợ giúp</td>
            </tr>
            <tr>
              <td>same_price</td>
              <td>Cùng mức giá</td>
            </tr>
            <tr>
              <td>find_sport_car</td>
              <td>Xe thể thao</td>
            </tr>
            <tr>
              <td>find_popular_car</td> 
              <td>Xe phổ biến</td>
            </tr>
            <tr>
              <td>made_in</td>
              <td>Tìm xe theo nước</td>
            </tr>
            <tr>
              <td>my_news</td>
              <td>Tin dành cho tôi</td>
            </tr>
            <tr>
              <td>this_is_my_wish_car</td>
              <td>Đây là xe mơ ước của tôi</td>
            </tr>
            <tr>
              <td>where_am_i</td>
              <td>Vị trí của tôi</td>
            </tr>
            <tr>
              <td>user_report</td>
              <td>Báo lỗi từ người dùng</td>
            </tr>
            <tr>
              <td>my_test_drive</td>
              <td>Lịch lái thử của tôi</td>
            </tr>
            <tr>
              <td>change_my_test_drive</td>
              <td>Đổi lịch lái thử</td>
            </tr>
            <tr>
              <td>cancel_my_test_drive</td>
              <td>Huỷ lịch lái thử</td>
            </tr>
            <tr>
              <td>ask_promotion</td>
              <td>Khuyến mãi và giảm giá</td>
            </tr>
            <tr>
              <td>confirm_my_test_drive</td>
              <td>Xác nhận đăng ký lái thử</td>
            </tr>
            <tr>
              <td>checkin_my_test_drive</td>
              <td>Bắt đầu làm thủ tục lái thử</td>
            </tr>
            <tr>
              <td>test_drive_completed_and_i_did</td>
              <td>Tôi đã tham gia và đã lái thử xe</td>
            </tr>
            <tr>
              <td>test_drive_completed_and_i_seated_in</td>
              <td>Tôi đã tham gia và ngồi trên xe lái thử</td>
            </tr>
            <tr>
              <td>test_drive_completed_but_i_did_not</td>
              <td>Tôi đã tham gia nhưng không lái thử</td>
            </tr>
            <tr>
              <td>test_drive_rating</td>
              <td>Đánh giá về lái thử</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}